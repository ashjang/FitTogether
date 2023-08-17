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
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
  public List<PostListDto> allPost() {

    List<Post> allPost = postRepository.findAllByOrderByCreatedAtDesc()
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));


    return allPost.stream().map(PostListDto::from)
        .collect(Collectors.toList());
  }

  /**
   * 내 게시글 보기
   */
  public List<PostListDto> myPost(String token) {
    if (!provider.validateToken(token)) {
      throw new RuntimeException("Invalid or expired token.");
    }

    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    List<Post> allPostByUser = postRepository.findAllByUserOrderByCreatedAtDesc(user)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    return allPostByUser.stream().map(PostListDto::from)
        .collect(Collectors.toList());
  }

  /**
   * 운동종목 별 검색
   */
  public List<PostListDto> getPostByCategory(String keyword) {

    Category category = Category.valueOf(keyword);

    List<Post> postList = postRepository.findByCategoryOrderByCreatedAtDesc(category)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    return postList.stream().map(PostListDto::from)
        .collect(Collectors.toList());
  }

  /**
   * 해시태그 별 검색
   */
  public List<PostListDto> getPostByHashtag(String keyword) {

    Hashtag hashtag = hashtagRepository.findByKeyword(keyword);

    Long hashtagId = hashtag.getId();

    List<PostHashtag> postHashtagList = postHashtagRepository.findAllByHashtagId(hashtagId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_HASHTAG));


    return postHashtagList.stream()
        .map(PostHashtag::getPost)
        .sorted(Comparator.comparing(Post::getCreatedAt).reversed())
        .map(PostListDto::from)
        .collect(Collectors.toList());
  }

  /**
   * 제목 별 검색
   */
  public List<PostListDto> getPostByTitle(String title) {
    List<Post> postList = postRepository.findByTitleContainingOrderByCreatedAtDesc(title)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    return postList.stream().map(PostListDto::from)
        .collect(Collectors.toList());
  }
}