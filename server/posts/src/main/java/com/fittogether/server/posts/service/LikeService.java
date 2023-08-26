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
import java.util.Objects;
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

  /**
   * 좋아요 토글
   */
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

  /**
   * 좋아요 캐싱
   */
  @Transactional
  public void getCachedLikeCount(Long postId, boolean isLiked) {
    String likeCountKey = "postLikeCount::" + postId;

    ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

    // 저장된 캐시가 없을 시
    if (valueOperations.get(likeCountKey) == null) {
      Long likeCount = getLikeCountByDB(postId);
      valueOperations.set(likeCountKey, String.valueOf(likeCount));
    } else {
      if (isLiked) {
        valueOperations.decrement(likeCountKey);
      } else {
        valueOperations.increment(likeCountKey);
      }
    }
  }

  /**
   * 좋아요 캐시 값 가져오기
   */
  public Long getLikeCountByRedis(Long postId) {
    String likeCountKey = "postLikeCount::" + postId;

    ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

    if (valueOperations.get(likeCountKey) == null) {
      return getLikeCountByDB(postId);
    }
    return Long.parseLong(Objects.requireNonNull(valueOperations.get(likeCountKey)));
  }

  /**
   * 좋아요 DB에서 가져오기
   */
  public Long getLikeCountByDB(Long postId) {
    return likeRepository.countByPostId(postId);
  }

  /**
   * 스케줄링으로 업데이트 호출 및 캐시 삭제
   */
  @Scheduled(cron = "0 0/3 * * * *")
  public void updateLikeCountByRedis() {
    log.info("DB 좋아요 수 갱신");
    Set<String> keys = redisTemplate.keys("postLikeCount::*");

    Objects.requireNonNull(keys).forEach(data -> {
      Long postId = Long.parseLong(data.split("::")[1]);
      Long likeCount = Long.parseLong(
          Objects.requireNonNull(redisTemplate.opsForValue().get(data)));

      updateLikeCountDB(postId, likeCount);
      redisTemplate.delete("postLikeCount::" + postId);
    });
  }

  /**
   * 좋아요 DB 업데이트
   */
  @Transactional
  public void updateLikeCountDB(Long postId, Long likeCount) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    post.setLikes(likeCount);
    postRepository.save(post);
  }
}
