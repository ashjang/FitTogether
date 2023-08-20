package com.fittogether.server.posts.domain.dto;


import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {
  private Long totalPostCount;
  private List<PostListDto> postList;

  public static PostResponse from(List<PostListDto> postList, Long totalElements) {
    return PostResponse.builder()
        .totalPostCount(totalElements)
        .postList(postList)
        .build();
  }
}
