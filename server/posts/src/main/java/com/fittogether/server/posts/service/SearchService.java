package com.fittogether.server.posts.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.posts.domain.dto.PostListDto;
import com.fittogether.server.posts.domain.dto.PostResponse;
import com.fittogether.server.posts.domain.model.Hashtag;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.model.PostHashtag;
import com.fittogether.server.posts.domain.repository.HashtagRepository;
import com.fittogether.server.posts.domain.repository.PostHashtagRepository;
import com.fittogether.server.posts.domain.repository.PostRepository;
import com.fittogether.server.posts.exception.ErrorCode;
import com.fittogether.server.posts.exception.PostException;
import com.fittogether.server.posts.type.Category;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SearchService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final PostHashtagRepository postHashtagRepository;
  private final HashtagRepository hashtagRepository;
  private final JwtProvider provider;
  private final PostService postService;
  private final LikeService likeService;

  /**
   * 전체 게시글 보기
   */
  public PostResponse allPost(int page, int size) {

    Pageable pageable = PageRequest.of(page, size);
    Page<Post> allPost = postRepository.findAllByOrderByCreatedAtDesc(pageable)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    List<Post> updateWatchedPost = updateWatchedAndLikePost(allPost);

    long totalElements = allPost.getTotalElements();

    return PostResponse.from(getPostList(updateWatchedPost), totalElements);
  }

  /**
   * 캐싱된 값으로 조회수 업데이트
   */
  private List<Post> updateWatchedAndLikePost(Page<Post> allPost) {
    return allPost.getContent().stream()
        .peek(post -> {
          Long watchedCount = postService.getWatchedCount(post.getId());
          Long likeCount = likeService.getLikeCountByRedis(post.getId());

          post.setWatched(watchedCount);
          post.setLikes(likeCount);
        }).collect(Collectors.toList());
  }

  /**
   * 해당 게시글 리스트에서 해시태그 추출해서 Dto변환
   */
  private List<PostListDto> getPostList(List<Post> Post) {
    return Post.stream().map(post -> {
          List<PostHashtag> postHashtagList = postHashtagRepository.findByPostId(post.getId())
              .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));
          List<String> hashtags = postHashtagList.stream()
              .map(postHashtag -> postHashtag.getHashtag().getKeyword())
              .collect(Collectors.toList());

          return PostListDto.from(post, hashtags);
        })
        .collect(Collectors.toList());
  }

  /**
   * 내 게시글 보기
   */
  public PostResponse myPost(String token, int page, int size) {
    if (!provider.validateToken(token)) {
      throw new RuntimeException("Invalid or expired token.");
    }

    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    Pageable pageable = PageRequest.of(page, size);
    Page<Post> allPostByUser = postRepository.findAllByUserOrderByCreatedAtDesc(user, pageable)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    List<Post> updateWatchedPost = updateWatchedAndLikePost(allPostByUser);

    long totalElements = allPostByUser.getTotalElements();

    return PostResponse.from(getPostList(updateWatchedPost), totalElements);
  }

  /**
   * 운동종목 별 검색
   */
  public PostResponse getPostByCategory(String keyword, int page, int size) {

    Category category = Category.valueOf(keyword);

    Pageable pageable = PageRequest.of(page, size);
    Page<Post> postList = postRepository.findByCategoryOrderByCreatedAtDesc(category, pageable)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    List<Post> updateWatchedPost = updateWatchedAndLikePost(postList);

    long totalElements = postList.getTotalElements();

    return PostResponse.from(getPostList(updateWatchedPost), totalElements);
  }

  /**
   * 해시태그 별 검색
   */
  public PostResponse getPostByHashtag(String keyword, int page, int size) {

    Hashtag hashtag = hashtagRepository.findByKeyword(keyword);
    if (hashtag == null) {
      throw new PostException(ErrorCode.NOT_FOUND_POST);
    }
    Long hashtagId = hashtag.getId();

    Pageable pageable = PageRequest.of(page, size);
    Page<PostHashtag> postHashtagList = postHashtagRepository.findAllByHashtagId(hashtagId,
            pageable)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_HASHTAG));

    List<Post> updateWatchedPost = updateWatchedAndLikePost(
        postHashtagList.map(PostHashtag::getPost));

    long totalElements = postHashtagList.getTotalElements();

    return PostResponse.from(getPostList(updateWatchedPost), totalElements);
  }

  /**
   * 제목 별 검색
   */
  public PostResponse getPostByTitle(String title, int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    Page<Post> postList = postRepository.findByTitleContainingOrderByCreatedAtDesc(title, pageable)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    List<Post> updateWatchedPost = updateWatchedAndLikePost(postList);

    long totalElements = postList.getTotalElements();

    return PostResponse.from(getPostList(updateWatchedPost), totalElements);
  }
}