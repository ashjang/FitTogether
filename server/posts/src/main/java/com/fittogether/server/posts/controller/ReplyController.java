package com.fittogether.server.posts.controller;

import com.fittogether.server.posts.domain.dto.ReplyForm;
import com.fittogether.server.posts.domain.dto.ReplyListDto;
import com.fittogether.server.posts.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class ReplyController {

  private final ReplyService replyService;

  /**
   * 댓글 작성
   */
  @PostMapping("{postId}/comment")
  public ResponseEntity<ReplyListDto> createReply(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable Long postId, @RequestBody ReplyForm replyForm) {

    return ResponseEntity.ok(replyService.getReplyListDto(
        token, postId, null, replyForm, true, false));
  }

  /**
   * 댓글 삭제
   */
  @DeleteMapping("/{postId}/comments/{replyId}")
  public ResponseEntity<?> deleteReply(@RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable Long postId,
      @PathVariable Long replyId) {
    replyService.deleteReply(token, postId, replyId);

    return ResponseEntity.ok(replyService.getReplyListDto(
        token, postId, null, null, false, false));
  }

  /**
   * 대댓글 작성
   */
  @PostMapping("/{postId}/comments/{replyId}")
  public ResponseEntity<ReplyListDto> createChildReply(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable Long postId,
      @PathVariable Long replyId,
      @RequestBody ReplyForm replyForm) {

    return ResponseEntity.ok(replyService.getReplyListDto(
        token, postId, replyId, replyForm, true, true));
  }

  /**
   * 대댓글 삭제
   */
  @DeleteMapping("/{postId}/comments/{replyId}/child-comment/{childReplyId}")
  public ResponseEntity<?> deleteChildReply(@RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable Long postId,
      @PathVariable Long replyId,
      @PathVariable Long childReplyId) {
    replyService.deleteChildReply(token, childReplyId);

    return ResponseEntity.ok(replyService.getReplyListDto(
        token, postId, replyId, null, false, true));
  }

}
