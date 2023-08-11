package com.fittogether.server.posts.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.posts.domain.dto.PostForm;
import com.fittogether.server.posts.domain.dto.PostInfo;
import com.fittogether.server.posts.domain.dto.PostListDto;
import com.fittogether.server.posts.domain.model.ChildReply;
import com.fittogether.server.posts.domain.model.Hashtag;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.model.PostHashtag;
import com.fittogether.server.posts.domain.model.Reply;
import com.fittogether.server.posts.domain.repository.ChildReplyRepository;
import com.fittogether.server.posts.domain.repository.HashtagRepository;
import com.fittogether.server.posts.domain.repository.LikeRepository;
import com.fittogether.server.posts.domain.repository.PostHashtagRepository;
import com.fittogether.server.posts.domain.repository.PostRepository;
import com.fittogether.server.posts.domain.repository.ReplyRepository;
import com.fittogether.server.posts.exception.ErrorCode;
import com.fittogether.server.posts.exception.PostException;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final PostHashtagRepository postHashtagRepository;
  private final HashtagRepository hashtagRepository;
  private final ReplyRepository replyRepository;
  private final ChildReplyRepository childReplyRepository;
  private final LikeRepository likeRepository;
  private final JwtProvider provider;
  private final RedisTemplate<String, String> redisTemplate;
  private final AuthenticationService authenticationService;

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

    Post post = Post.builder()
        .user(user)
        .title(postForm.getTitle())
        .description(postForm.getDescription())
        .image(postForm.getImage())
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

    post.setTitle(postForm.getTitle());
    post.setDescription(postForm.getDescription());
    post.setImage(postForm.getImage());
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

    boolean isLike = likeRepository.existsByPost(post);

    Long incrementWatchedCount = incrementWatchedCount(postId);
    Long totalReplyCount = getTotalReplyCount(postId);

    return PostInfo.from(post, replyList, childReplies, totalReplyCount, isLike,
        incrementWatchedCount);
  }

  /**
   * 댓글 수
   */
  @Transactional
  public Long getTotalReplyCount(Long postId) {
    Long replyCount = replyRepository.countByPostId(postId);
    Long childReplyCount = childReplyRepository.countByPostId(postId);

    return replyCount + childReplyCount;
  }

  /**
   * 조회수 캐싱
   */
  @Transactional
  public Long incrementWatchedCount(Long postId) {
    String key = "postWatchedCount::" + postId;

    ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

    if (valueOperations.get(key) == null) {
      Post post = postRepository.findById(postId)
          .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

      valueOperations.set(key, String.valueOf(post.getWatched()), Duration.ofMinutes(5));
      valueOperations.increment(key);
      return Long.parseLong(valueOperations.get(key));

    } else {
      valueOperations.increment(key);
      return Long.parseLong(valueOperations.get(key));
    }
  }

  /**
   * 스케줄링으로 업데이트 호출 및 캐시 삭제
   */
  @Scheduled(cron = "0 0/3 * * * *")
  public void syncWatchedCountToDatabase() {
    log.info("DB 조회수 갱신");

    Set<String> keys = redisTemplate.keys("postWatchedCount::*");

    for (String data : keys) {
      Long postId = Long.parseLong(data.split("::")[1]);
      Long viewCnt = Long.parseLong(redisTemplate.opsForValue().get(data));

      updateWatchedCountInDatabase(postId, viewCnt);
      redisTemplate.delete("postWatchedCount::" + postId);
    }
  }

  /**
   * 조회수 DB 업데이트
   */
  @Transactional
  public void updateWatchedCountInDatabase(Long postId, Long watchedCount) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    post.setWatched(watchedCount);
    postRepository.save(post);
  }

  /**
   * 전체 게시글 보기
   */
  public List<PostListDto> allPost() {

    List<Post> allPost = postRepository.findAll();

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

    List<Post> allPostByUser = postRepository.findAllByUser(user);

    return allPostByUser.stream().map(PostListDto::from)
        .collect(Collectors.toList());
  }
}