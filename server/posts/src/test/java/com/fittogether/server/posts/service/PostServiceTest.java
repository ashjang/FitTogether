package com.fittogether.server.posts.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.posts.domain.model.Like;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.repository.LikeRepository;
import com.fittogether.server.posts.domain.repository.PostRepository;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

  @InjectMocks
  private LikeService likeService;

  @Mock
  private PostRepository postRepository;

  @Mock
  private UserRepository userRepository;
  @Mock
  private LikeRepository likeRepository;

  @Mock
  private CacheManager cacheManager;

  @Mock
  private JwtProvider provider;


  @Test
  void testLikePost() {

    when(provider.validateToken(anyString())).thenReturn(true);

    UserVo userVo = new UserVo(1L, "test");
    when(provider.getUserVo(anyString())).thenReturn(userVo);

    User user = User.builder()
        .userId(1L)
        .nickname("test")
        .password("1234")
        .build();

    Post post = Post.builder()
        .user(user)
        .id(1L)
        .likes(0L)
        .build();

    when(userRepository.findById(userVo.getUserId())).thenReturn(Optional.of(user));

    when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));

    when(likeRepository.save(any(Like.class))).thenReturn(new Like());


    boolean result = likeService.likePost("token", post.getId());

    assertTrue(result);

    verify(postRepository, times(1)).findById(post.getId());
    verify(likeRepository, times(1)).findByPostAndUser(post, user);
    verify(likeRepository, times(1)).save(any(Like.class));
  }

  @Test
  void testGetPostLikeCount() {
    Long postId = 1L;
    long likeCount = 10L;

    when(likeRepository.countByPostId(postId)).thenReturn(likeCount);

    Long result = likeService.postLikeCount(postId);

    assertEquals(likeCount, result);
    verify(likeRepository, times(1)).countByPostId(postId);
  }

  @Test
  void testEvictPostLikeCount() {
    Long postId = 1L;

    Cache cache = mock(Cache.class);
    when(cacheManager.getCache("postLikeCount")).thenReturn(cache);

    likeService.evictPostLikeCount(postId);

    verify(cacheManager, times(1)).getCache("postLikeCount");
    verify(cache, times(1)).evict(postId);
  }
}