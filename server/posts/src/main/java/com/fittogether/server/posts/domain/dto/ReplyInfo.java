package com.fittogether.server.posts.domain.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyInfo {
  private Long replyId;
  private String comment;
  private Long likes;
  private LocalDateTime createdAt;
}
