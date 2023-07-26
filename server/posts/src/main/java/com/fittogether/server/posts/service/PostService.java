package com.fittogether.server.posts.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.posts.domain.dto.PostForm;
import com.fittogether.server.posts.domain.model.Hashtag;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.model.PostHashtag;
import com.fittogether.server.posts.domain.repository.HashtagRepository;
import com.fittogether.server.posts.domain.repository.PostHashtagRepository;
import com.fittogether.server.posts.domain.repository.PostRepository;
import com.fittogether.server.posts.exception.ErrorCode;
import com.fittogether.server.posts.exception.PostException;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PostService {

  private final PostRepository postRepository;
  private final PostHashtagRepository postHashtagRepository;
  private final HashtagRepository hashtagRepository;
  private final JwtProvider provider;

  // 게시글 작성
  @Transactional
  public Post createPost(String token, PostForm postForm) {
    if (!provider.validateToken(token)) {
      throw new RuntimeException("Invalid or expired token.");
    }

    UserVo userVo = provider.getUserVo(token);


//    if (!addPostForm.isAccessLevel()) {
//    }


    List<Hashtag> savedHashtag = addHashtag(postForm);

    Post post = Post.builder()
        .id(userVo.getUserId())
        .title(postForm.getTitle())
        .description(postForm.getDescription())
        .image(postForm.getImage())
        .category(postForm.getCategory().name())
        .accessLevel(postForm.isAccessLevel())
        .createdAt(LocalDateTime.now()).build();

    for (Hashtag hashtags : savedHashtag) {
      postHashtagRepository.save(PostHashtag.builder()
          .post(post)
          .hashtag(hashtags)
          .build());
    }

    return postRepository.save(post);
  }

  private List<Hashtag> addHashtag(PostForm addPostForm) {
    List<Hashtag> savedHashtag = new ArrayList<>();

    for (Hashtag hashtags : addPostForm.getHashtag()) {
      Hashtag keyword = hashtagRepository.findByKeyword(hashtags.getKeyword());

      if (keyword == null) {
        // 해당 해시태그가 데이터베이스에 존재하지 않으면, 새로운 해시태그를 저장합니다.
        savedHashtag.add(hashtagRepository.save(hashtags));
      } else {
        // 해당 해시태그가 이미 존재한다면, 기존의 것을 사용합니다.
        savedHashtag.add(keyword);
      }
    }
    return savedHashtag;
  }

  @Transactional
  public Post updatePost(String token, Long postId, PostForm postForm) {
//    if (!addPostForm.isAccessLevel()) {
//    }
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    validate(token, post);

    post.setTitle(postForm.getTitle());
    post.setDescription(postForm.getDescription());
    post.setImage(postForm.getImage());
    post.setCategory(postForm.getCategory().name());
    post.setAccessLevel(postForm.isAccessLevel());
    post.setModifiedAt(LocalDateTime.now());

    List<PostHashtag> currentPostHashtag = postHashtagRepository.findByPostId(postId);
    postHashtagRepository.deleteAll(currentPostHashtag);

    List<Hashtag> hashtag = addHashtag(postForm);

    for (Hashtag hashtags : hashtag) {
      postHashtagRepository.save(PostHashtag.builder()
          .post(post)
          .hashtag(hashtags)
          .build());
    }

    return post;
  }

  private void validate(String token, Post post) {
    if (!provider.validateToken(token)) {
      throw new RuntimeException("Invalid or expired token.");
    }

    UserVo userVo = provider.getUserVo(token);

    if (!post.getId().equals(userVo.getUserId())) {
      throw new UserCustomException(UserErrorCode.NOT_FOUND_USER);
    }
  }
}