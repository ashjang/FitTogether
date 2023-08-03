package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.type.Category;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostForm {

  private String title;
  private String description;
  private MultipartFile image;
  private Category category;
  private boolean accessLevel;
  private List<String> hashtag;
}