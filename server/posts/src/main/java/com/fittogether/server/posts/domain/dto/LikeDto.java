package com.fittogether.server.posts.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LikeDto {
  private boolean like;
  private Long likeCount;

  public static LikeDto from(boolean like, Long likeCount) {
    return LikeDto.builder()
        .like(like)
        .likeCount(likeCount)
        .build();
  }
}
