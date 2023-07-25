package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.domain.model.Hashtag;
import com.fittogether.server.user.type.Category;
import java.util.List;
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
public class AddPostForm {

  private String title;
  private String description;
  private String image;
  private Category category;
  private boolean accessLevel;
  private List<Hashtag> hashtag;
}
