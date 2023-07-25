package com.fittogether.server.posts.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.posts.domain.dto.AddPostForm;
import com.fittogether.server.posts.domain.dto.UpdatePostForm;
import com.fittogether.server.posts.domain.model.Hashtag;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.model.PostHashtag;
import com.fittogether.server.posts.domain.repository.HashtagRepository;
import com.fittogether.server.posts.domain.repository.PostHashtagRepository;
import com.fittogether.server.posts.domain.repository.PostRepository;
import com.fittogether.server.posts.exception.ErrorCode;
import com.fittogether.server.posts.exception.PostException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
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
  public Post createPost(/*String token,*/ AddPostForm addPostForm) {

//    provider.validateToken(token);

//    if (!addPostForm.isAccessLevel()) {
//    }

    List<Hashtag> savedHashtag = addHashtag(addPostForm);

    Post post = Post.builder()
        .title(addPostForm.getTitle())
        .description(addPostForm.getDescription())
        .image(addPostForm.getImage())
        .category(addPostForm.getCategory().name())
        .accessLevel(addPostForm.isAccessLevel())
        .createdAt(LocalDateTime.now()).build();

    for (Hashtag hashtags : savedHashtag) {
      postHashtagRepository.save(PostHashtag.builder()
          .post(post)
          .hashtag(hashtags)
          .build());
    }

    return postRepository.save(post);
  }

  private List<Hashtag> addHashtag(AddPostForm addPostForm) {
    List<Hashtag> hashtag = addPostForm.getHashtag();
    List<Hashtag> savedHashtag = new ArrayList<>();

    for (Hashtag hashtags : hashtag) {
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

  private List<Hashtag> updateHashtag(Long postId, UpdatePostForm updatePostForm) {
    List<Hashtag> newHashtag = new ArrayList<>();
    List<Hashtag> savedHashtag = new ArrayList<>();

    // 새로 추가될 해시태그 키워드들이 db에 있는지 확인
    for (Hashtag hashtags : updatePostForm.getHashtag()) {
      Hashtag keyword = hashtagRepository.findByKeyword(hashtags.getKeyword());

      if (keyword == null) {
        // 해당 해시태그가 데이터베이스에 존재하지 않으면, 새로운 해시태그를 저장합니다.
        newHashtag.add(hashtagRepository.save(hashtags));
      } else {
        // 해당 해시태그가 이미 존재한다면, 기존의 것을 사용합니다.
        newHashtag.add(keyword);
      }
    }

    // 원래 게시글에 맵핑된 해시태그 목록 가져오기
    List<PostHashtag> currentPostHashtags = postHashtagRepository.findByPostId(postId);
    List<Hashtag> currentHashtags = currentPostHashtags.stream()
        .map(PostHashtag::getHashtag)
        .collect(Collectors.toList());

    // 수정할 해시태그중 원래 게시글에 저장되어있던 해시태그가 아닌 경우
    List<Hashtag> addHashtag = newHashtag.stream()
        .filter(hashtag -> !currentHashtags.contains(hashtag))
        .collect(Collectors.toList());

    for (Hashtag hashtag : addHashtag) {
      Hashtag existingHashtag = hashtagRepository.findByKeyword(hashtag.getKeyword());

        savedHashtag.add(existingHashtag);
    }

    // 원래 저장된 해시태그중 수정할 해시태그에 포함되지 않은 경우 (삭제할 경우)
    List<Hashtag> removeHashtag = currentHashtags.stream()
        .filter(hashtag -> !newHashtag.contains(hashtag))
        .collect(Collectors.toList());

    List<PostHashtag> removeList = new ArrayList<>();

    for (Hashtag removeHashtags : removeHashtag) {
      currentPostHashtags.stream()
          .filter(postHashtag -> postHashtag.getHashtag().equals(removeHashtags)).findFirst()
          .ifPresent(removeList::add);
    }

    postHashtagRepository.deleteAll(removeList);

    return savedHashtag;
  }

  @Transactional
  public Post updatePost(/*String token,*/ Long postId, UpdatePostForm
      updatePostForm) {
//    provider.validateToken(token);

//    if (!addPostForm.isAccessLevel()) {
//    }
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    List<Hashtag> hashtag = updateHashtag(postId, updatePostForm);

    post.setTitle(updatePostForm.getTitle());
    post.setDescription(updatePostForm.getDescription());
    post.setImage(updatePostForm.getImage());
    post.setCategory(updatePostForm.getCategory().name());
    post.setAccessLevel(updatePostForm.isAccessLevel());
    post.setModifiedAt(LocalDateTime.now());

    for (Hashtag hashtags : hashtag) {
      postHashtagRepository.save(PostHashtag.builder()
          .post(post)
          .hashtag(hashtags)
          .build());
    }

    return post;
  }
}