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
  private Long replyId;
  private Long childReplyId;
  private String comment;
  private LocalDateTime createdAt;
  private String userNickname;
  private String userImage;
  private Long postId;

  public static ReplyDto from(Reply reply) {
    return ReplyDto.builder()
        .comment(reply.getComment())
        .createdAt(reply.getCreatedAt())
        .userNickname(reply.getUser().getNickname())
        .userImage(reply.getUser().getProfilePicture())
        .postId(reply.getPost().getId())
        .replyId(reply.getId())
        .build();
  }

  public static ReplyDto fromChild(ChildReply childReply) {
    return ReplyDto.builder()
        .comment(childReply.getComment())
        .createdAt(childReply.getCreatedAt())
        .userNickname(childReply.getUser().getNickname())
        .userImage(childReply.getUser().getProfilePicture())
        .postId(childReply.getReply().getPost().getId())
        .replyId(childReply.getReply().getId())
        .childReplyId(childReply.getId())
        .build();
  }
}