package com.fittogether.server.posts.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.posts.domain.dto.PostForm;
import com.fittogether.server.posts.domain.dto.PostInfo;
import com.fittogether.server.posts.domain.model.ChildReply;
import com.fittogether.server.posts.domain.model.Hashtag;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.model.PostHashtag;
import com.fittogether.server.posts.domain.model.Reply;
import com.fittogether.server.posts.domain.repository.ChildReplyRepository;
import com.fittogether.server.posts.domain.repository.HashtagRepository;
import com.fittogether.server.posts.domain.repository.PostHashtagRepository;
import com.fittogether.server.posts.domain.repository.PostRepository;
import com.fittogether.server.posts.domain.repository.ReplyRepository;
import com.fittogether.server.posts.exception.ErrorCode;
import com.fittogether.server.posts.exception.PostException;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class PostService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final PostHashtagRepository postHashtagRepository;
  private final HashtagRepository hashtagRepository;
  private final ReplyRepository replyRepository;
  private final ChildReplyRepository childReplyRepository;
  private final JwtProvider provider;
  private final AuthenticationService authenticationService;

  private final RedisTemplate redisTemplate;

  /**
   * 게시글 작성
   */
  @Transactional
  public Post createPost(String token, PostForm postForm) {
    if (!provider.validateToken(token)) {
      throw new RuntimeException("Invalid or expired token.");
    }

    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    String imagePath = uploadImage(postForm.getImage());

    Post post = Post.builder()
        .user(user)
        .title(postForm.getTitle())
        .description(postForm.getDescription())
        .image(imagePath)
        .category(postForm.getCategory())
        .accessLevel(postForm.isAccessLevel())
        .likes(0L)
        .watched(0L)
        .createdAt(LocalDateTime.now()).build();

    List<Hashtag> savedHashtag = addHashtag(postForm);

    List<PostHashtag> postHashtags = savedHashtag.stream()
        .map(hashtag -> PostHashtag.builder()
            .post(post)
            .hashtag(hashtag)
            .build())
        .collect(Collectors.toList());

    postHashtagRepository.saveAll(postHashtags);

    return postRepository.save(post);
  }

  /**
   * 해시태그 추가
   */
  @Transactional
  public List<Hashtag> addHashtag(PostForm addPostForm) {
    List<String> hashtags = addPostForm.getHashtag();

    List<Hashtag> savedHashtag = hashtags.stream()
        .map(hashtag -> {
          Hashtag existKeyword = hashtagRepository.findByKeyword(hashtag);
          // 해당 해시태그가 이미 존재한다면, 기존의 것을 사용합니다.
          if (existKeyword != null) {
            return existKeyword;
          } else {
            // 해당 해시태그가 데이터베이스에 존재하지 않으면, 새로운 해시태그를 저장합니다.
            Hashtag newHashtag = new Hashtag();
            newHashtag.setKeyword(hashtag);
            return newHashtag;
          }
        })
        .collect(Collectors.toList());

    return hashtagRepository.saveAll(savedHashtag);

  }

  /**
   * 게시글 수정
   */
  @Transactional
  public Post updatePost(String token, Long postId, PostForm postForm) {

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    authenticationService.validate(token, post);

    String imagePath = uploadImage(postForm.getImage());

    post.setTitle(postForm.getTitle());
    post.setDescription(postForm.getDescription());
    post.setImage(imagePath);
    post.setCategory(postForm.getCategory());
    post.setAccessLevel(postForm.isAccessLevel());
    post.setModifiedAt(LocalDateTime.now());

    List<PostHashtag> currentPostHashtag = postHashtagRepository.findByPostId(postId);
    postHashtagRepository.deleteAll(currentPostHashtag);

    List<Hashtag> hashtag = addHashtag(postForm);

    List<PostHashtag> postHashtags = hashtag.stream()
        .map(hashtags -> PostHashtag.builder()
            .post(post)
            .hashtag(hashtags)
            .build())
        .collect(Collectors.toList());

    postHashtagRepository.saveAll(postHashtags);

    return post;
  }


  /**
   * 게시글 삭제
   */
  @Transactional
  public void deletePost(String token, Long postId) {

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    authenticationService.validate(token, post);

    List<PostHashtag> postIds = postHashtagRepository.findByPostId(postId);

    postHashtagRepository.deleteAll(postIds);

    postRepository.delete(post);
  }

  /**
   * 게시글 보기
   */
  public PostInfo clickPostById(Long postId) {

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    if (!post.isAccessLevel()) {
      throw new PostException(ErrorCode.NO_PERMISSION_TO_VIEW_POST);
    }

    List<Reply> replyList = replyRepository.findByPostId(postId);

    List<Long> replyIds = replyList.stream()
        .map(Reply::getId)
        .collect(Collectors.toList());

    List<ChildReply> childReplies = childReplyRepository.findByReplyIdIn(replyIds);

    incrementWatchedCount(postId);

    return PostInfo.from(post, replyList, childReplies);
  }

  @Transactional
  public void incrementWatchedCount(Long postId) {
    String key = "postWatchedCount::" + postId;

    ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    valueOperations.set(key, String.valueOf(post.getWatched()), Duration.ofMinutes(5));

    Long incrementWatchedCount = valueOperations.increment(key);

    updateWatchedCount(postId, incrementWatchedCount);

  }

  @Transactional
  public void updateWatchedCount(Long postId, Long watchedCount) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    post.setWatched(watchedCount); // 조회수 업데이트
    postRepository.save(post);
  }

  @Value("${upload.path}")
  private String uploadPath;

  public String uploadImage(MultipartFile file) {

    String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(uploadPath).resolve(fileName);

    try {
      Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
      return filePath.toString() ;
    } catch (IOException e) {
      throw new RuntimeException("Failed to upload image", e);
    }
  }

}