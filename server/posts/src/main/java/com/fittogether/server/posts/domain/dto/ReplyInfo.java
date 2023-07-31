package com.fittogether.server.posts.domain.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyInfo {
  private Long replyId;
  private String comment;
  private LocalDateTime createdAt;
}
