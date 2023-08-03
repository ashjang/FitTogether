package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.domain.model.ChildReply;
import com.fittogether.server.posts.domain.model.Reply;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyDto {
  private String comment;
  private LocalDateTime createdAt;
  private String userNickname;
  private Long postId;
  private Long replyId;

  public static ReplyDto from(Reply reply) {
    return ReplyDto.builder()
        .comment(reply.getComment())
        .createdAt(LocalDateTime.now())
        .userNickname(reply.getUser().getNickname())
        .postId(reply.getPost().getId())
        .build();
  }

  public static ReplyDto fromChild(ChildReply childReply) {
    return ReplyDto.builder()
        .comment(childReply.getComment())
        .createdAt(LocalDateTime.now())
        .userNickname(childReply.getUser().getNickname())
        .postId(childReply.getReply().getPost().getId())
        .replyId(childReply.getReply().getId())
        .build();
  }
}
