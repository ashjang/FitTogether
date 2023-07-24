package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.domain.model.Post;
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
public class PostDto {
  private Long id;
  private String title;
  private String description;
  private String image;
  private String category;
  private LocalDateTime createdAt;

  public static PostDto from(Post post) {
    return PostDto.builder()
        .id(post.getId())
        .title(post.getTitle())
        .description(post.getDescription())
        .image(post.getImage())
        .category(post.getCategory())
        .createdAt(LocalDateTime.now())
        .build();
  }
}
