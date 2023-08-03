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

  public static LikeDto from(boolean like) {
    return LikeDto.builder()
        .like(like)
        .build();
  }
}
