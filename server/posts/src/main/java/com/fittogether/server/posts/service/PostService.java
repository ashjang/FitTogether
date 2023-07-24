package com.fittogether.server.posts.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.posts.domain.dto.AddPostForm;
import com.fittogether.server.posts.domain.model.Hashtag;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.model.PostHashtag;
import com.fittogether.server.posts.domain.repository.HashtagRepository;
import com.fittogether.server.posts.domain.repository.PostHashtagRepository;
import com.fittogether.server.posts.domain.repository.PostRepository;
import java.time.LocalDateTime;
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

    Hashtag hashtag = addPostForm.getHashtag();

    Hashtag keyword = hashtagRepository.findByKeyword(hashtag.getKeyword());

    if (keyword == null) {
      // 해당 해시태그가 데이터베이스에 존재하지 않으면, 새로운 해시태그를 저장합니다.
      hashtag = hashtagRepository.save(hashtag);
    } else {
      // 해당 해시태그가 이미 존재한다면, 기존의 것을 사용합니다.
      hashtag = keyword;
    }

    Post post = Post.builder()
        .title(addPostForm.getTitle())
        .description(addPostForm.getDescription())
        .image(addPostForm.getImage())
        .category(addPostForm.getCategory().name())
        .accessLevel(addPostForm.isAccessLevel())
        .createdAt(LocalDateTime.now())
        .build();

    postHashtagRepository.save(PostHashtag.builder()
        .post(post)
        .hashtag(hashtag)
        .build());

    return postRepository.save(post);
  }

}
