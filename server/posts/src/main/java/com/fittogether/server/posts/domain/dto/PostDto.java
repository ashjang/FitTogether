package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.type.Category;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDto {
  private Long id;
  private String title;
  private String description;
  private Category category;
  private boolean accessLevel;
  private LocalDateTime createdAt;

  public static PostDto from(Post post) {
    return PostDto.builder()
        .id(post.getId())
        .title(post.getTitle())
        .description(post.getDescription())
        .category(post.getCategory())
        .accessLevel(post.isAccessLevel())
        .createdAt(LocalDateTime.now())
        .build();
  }
}
