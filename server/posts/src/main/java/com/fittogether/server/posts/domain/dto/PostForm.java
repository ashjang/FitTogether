package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.type.Category;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostForm {

  private String title;
  private String description;
  private String image;
  private Category category;
  private boolean accessLevel;
  private List<String> hashtag;
}