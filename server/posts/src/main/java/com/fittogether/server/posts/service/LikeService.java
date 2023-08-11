package com.fittogether.server.posts.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.posts.domain.model.Like;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.repository.LikeRepository;
import com.fittogether.server.posts.domain.repository.PostRepository;
import com.fittogether.server.posts.exception.ErrorCode;
import com.fittogether.server.posts.exception.PostException;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import java.util.Iterator;
import java.util.Set;
import javax.persistence.LockModeType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LikeService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final LikeRepository likeRepository;
  private final JwtProvider provider;
  private final RedisTemplate<String, String> redisTemplate;

  /**
   * 좋아요 클릭
   */
  @Transactional
  public boolean likePost(String token, Long postId) {

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    if (!provider.validateToken(token)) {
      throw new RuntimeException("Invalid or expired token.");
    }

    UserVo userVo = provider.getUserVo(token);
    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    return LikeToggle(post, user);
  }

  @Lock(LockModeType.OPTIMISTIC)
  private boolean LikeToggle(Post post, User user) {
    boolean isLiked = likeRepository.existsByPostAndUser(post, user);

    // 좋아요 토글
    if (isLiked) { // 좋아요 눌린 상태에서 취소
      likeRepository.deleteByPostAndUser(post, user);
      getCachedLikeCount(post.getId(), true);
    } else { // 좋아요 눌리지 않은 상태에서 좋아요
      Like like = Like.builder()
          .post(post)
          .user(user)
          .build();
      likeRepository.save(like);
      getCachedLikeCount(post.getId(), false);
    }

    return !isLiked;
  }

  @Transactional
  public void getCachedLikeCount(Long postId, boolean isLiked) {
    String likeCountKey = "postLikeCount::" + postId;

    ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

    if (valueOperations.get(likeCountKey) == null) {
      Long likeCount = likeRepository.countByPostId(postId);
      valueOperations.set(likeCountKey, String.valueOf(likeCount));
    } else {
      if (isLiked) {
        valueOperations.decrement(likeCountKey);
      } else {
        valueOperations.increment(likeCountKey);
      }
    }
  }

  @Scheduled(cron = "0 0/3 * * * *")
  public void updateLikeCountRedis() {
    log.info("DB 좋아요 수 갱신");
    Set<String> keys = redisTemplate.keys("postLikeCount::*");
    Iterator<String> it = keys.iterator();
    while (it.hasNext()) {
      String data = it.next();
      Long postId = Long.parseLong(data.split("::")[1]);
      Long likeCount = Long.parseLong(redisTemplate.opsForValue().get(data));
      updateLikeCountDB(postId, likeCount);
      redisTemplate.delete("postLikeCount::" + postId);
    }
  }

  @Transactional
  public void updateLikeCountDB(Long postId, Long likeCount) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    post.setLikes(likeCount);
    postRepository.save(post);
  }
}
