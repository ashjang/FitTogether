package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.domain.model.Hashtag;
import com.fittogether.server.user.type.Category;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
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

  @NotBlank(message = "제목은 필수 입력 사항입니다.")
  private String title;
  @NotBlank(message = "내용은 필수 입력 사항입니다.")
  private String description;
  private String image;
  private Category category;
  private boolean accessLevel;
  private Hashtag hashtag;
}
