package com.fittogether.server.posts.domain.dto;

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
  private LocalDateTime modifiedAt;
  private String userNickname;
  private Long postId;

  public static ReplyDto from(Reply reply) {
    return ReplyDto.builder()
        .comment(reply.getComment())
        .createdAt(LocalDateTime.now())
        .userNickname(reply.getUser().getNickname())
        .postId(reply.getPost().getId())
        .build();
  }
}
