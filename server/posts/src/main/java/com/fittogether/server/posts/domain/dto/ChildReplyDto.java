package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.domain.model.ChildReply;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChildReplyDto {
  private String comment;
  private LocalDateTime createdAt;
  private String userNickname;
  private Long postId;
  private Long replyId;

  public static ChildReplyDto fromChild(ChildReply childReply) {
    return ChildReplyDto.builder()
        .comment(childReply.getComment())
        .createdAt(LocalDateTime.now())
        .userNickname(childReply.getUser().getNickname())
        .postId(childReply.getReply().getPost().getId())
        .replyId(childReply.getReply().getId())
        .build();
  }
}
