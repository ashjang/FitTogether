package com.fittogether.server.posts.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.posts.domain.dto.ReplyForm;
import com.fittogether.server.posts.domain.dto.ReplyListDto;
import com.fittogether.server.posts.domain.model.ChildReply;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.model.Reply;
import com.fittogether.server.posts.domain.repository.ChildReplyRepository;
import com.fittogether.server.posts.domain.repository.PostRepository;
import com.fittogether.server.posts.domain.repository.ReplyRepository;
import com.fittogether.server.posts.exception.ErrorCode;
import com.fittogether.server.posts.exception.PostException;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReplyService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final ReplyRepository replyRepository;
  private final ChildReplyRepository childReplyRepository;
  private final AuthenticationService authenticationService;
  private final JwtProvider provider;

  /**
   * 댓글 작성
   */
  @Transactional
  public void createReply(String token, Long postId, ReplyForm replyForm) {

    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    Reply reply = Reply.builder()
        .post(post)
        .user(user)
        .comment(replyForm.getComment())
        .createdAt(LocalDateTime.now())
        .build();

    replyRepository.save(reply);
  }

  /**
   * 댓글 삭제
   */
  @Transactional
  public void deleteReply(String token, Long postId, Long replyId) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    authenticationService.validate(token, post);

    Reply reply = replyRepository.findByPostIdAndId(postId, replyId);

    replyRepository.delete(reply);
  }

  /**
   * 대댓글 작성
   */
  @Transactional
  public void createChildReply(String token, Long postId, Long replyId, ReplyForm replyForm) {
    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    Reply postReply = replyRepository.findById(replyId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_REPLY));

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_POST));

    ChildReply childReply = ChildReply.builder()
        .reply(postReply)
        .user(user)
        .post(post)
        .comment(replyForm.getComment())
        .createdAt(LocalDateTime.now())
        .build();

    childReplyRepository.save(childReply);
  }

  @Transactional
  public void deleteChildReply(String token, Long childReplyId) {
    if (!provider.validateToken(token)) {
      throw new RuntimeException("Invalid or expired token.");
    }

    UserVo userVo = provider.getUserVo(token);

    ChildReply childReply = childReplyRepository.findById(childReplyId)
        .orElseThrow(() -> new PostException(ErrorCode.NOT_FOUND_REPLY));

    if (!childReply.getUser().getUserId().equals(userVo.getUserId())) {
      throw new PostException(ErrorCode.ONLY_AUTHOR_DELETE);
    }

    childReplyRepository.delete(childReply);
  }

  /**
   * 댓글 리스트
   */
  public List<Reply> getReplyList(Long postId) {
    return replyRepository.findAllByPostId(postId);
  }

  /**
   * 대댓글 리스트
   */
  public List<ChildReply> getChildReplyList(Long postId) {
    return childReplyRepository.findAllByPostId(postId);
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


  public ReplyListDto getReplyListDto(String token, Long postId, Long replyId, ReplyForm replyForm,
      boolean isCreate, boolean isChild, Long childReplyId) {

    if (isCreate) {
      if (!isChild) {
        createReply(token, postId, replyForm);
      } else {
        createChildReply(token, postId, replyId, replyForm);
      }
    }

    List<Reply> replyList = getReplyList(postId);
    List<ChildReply> childReplyList = getChildReplyList(postId);
    Long totalReplyCount = getTotalReplyCount(postId);

    return ReplyListDto.fromList(replyList, childReplyList, totalReplyCount);
  }
}
