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
import lombok.RequiredArgsConstructor;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final LikeRepository likeRepository;
  private final CacheManager cacheManager;
  private final JwtProvider provider;

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


    synchronized (postId.toString().intern()) {
      Like existingLike = likeRepository.findByPostAndUser(post, user);

      if (existingLike != null) {
        likeRepository.deleteByPostAndUser(post, user);
        post.setLikes(postLikeCount(postId));
        evictPostLikeCount(postId);
      } else {
        post.setLikes(postLikeCount(postId) + 1);
        Like like = Like.builder()
            .post(post)
            .user(user)
            .build();
        likeRepository.save(like);
        evictPostLikeCount(postId);
      }

      return existingLike == null;
    }
  }

  /**
   * 게시글 좋아요 수 캐싱
   */
  @Cacheable(value = "postLikeCount", key = "#postId")
  public Long postLikeCount(Long postId) {
    return likeRepository.countByPostId(postId);
  }

  /**
   * 캐시 갱신
   */
  @CacheEvict(value = "postLikeCount", key = "#postId")
  public void evictPostLikeCount(Long postId) {
    Cache cache = cacheManager.getCache("postLikeCount");
    if (cache != null) {
      cache.evict(postId);
    }
  }
}
