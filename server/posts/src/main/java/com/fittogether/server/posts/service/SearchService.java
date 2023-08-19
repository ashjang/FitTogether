package com.fittogether.server.posts.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.posts.domain.dto.PostListDto;
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

  /**
   * 전체 게시글 보기
   */
  public List<PostListDto> allPost(int page, int size) {

    Pageable pageable = PageRequest.of(page, size);
    Page<Post> allPost = postRepository.findAllByOrderByCreatedAtDesc(pageable)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    return getPostList(allPost);
  }

  /**
   * 해당 게시글 리스트에서 해시태그 추출해서 Dto변환
   */
  private List<PostListDto> getPostList(Page<Post> Post) {
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
  public List<PostListDto> myPost(String token,int page, int size) {
    if (!provider.validateToken(token)) {
      throw new RuntimeException("Invalid or expired token.");
    }

    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    Pageable pageable = PageRequest.of(page, size);
    Page<Post> allPostByUser = postRepository.findAllByUserOrderByCreatedAtDesc(user, pageable)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    return getPostList(allPostByUser);
  }

  /**
   * 운동종목 별 검색
   */
  public List<PostListDto> getPostByCategory(String keyword,int page, int size) {

    Category category = Category.valueOf(keyword);

    Pageable pageable = PageRequest.of(page, size);
    Page<Post> postList = postRepository.findByCategoryOrderByCreatedAtDesc(category, pageable)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    return getPostList(postList);
  }

  /**
   * 해시태그 별 검색
   */
  public List<PostListDto> getPostByHashtag(String keyword,int page, int size) {

    Hashtag hashtag = hashtagRepository.findByKeyword(keyword);
    if (hashtag == null) {
      throw new PostException(ErrorCode.NOT_FOUND_POST);
    }
    Long hashtagId = hashtag.getId();

    Pageable pageable = PageRequest.of(page, size);
    Page<PostHashtag> postHashtagList = postHashtagRepository.findAllByHashtagId(hashtagId, pageable)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_HASHTAG));

    return getPostList(postHashtagList.map(PostHashtag::getPost));
  }

  /**
   * 제목 별 검색
   */
  public List<PostListDto> getPostByTitle(String title,int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    Page<Post> postList = postRepository.findByTitleContainingOrderByCreatedAtDesc(title, pageable)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    return getPostList(postList);
  }
}