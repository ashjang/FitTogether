package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.model.Reply;
import java.time.LocalDateTime;
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
public class PostInfo {

  private Long userId;
  private String category;
  private String title;
  private String description;
  private String image;
  private Long likes;
  private Long watched;
  private List<Reply> replyList;
  private LocalDateTime createdAt;

  public static PostInfo from(Post post, List<Reply> replyList) {

    return PostInfo.builder()
        .userId(post.getUser().getUserId())
        .category(post.getCategory())
        .title(post.getTitle())
        .description(post.getDescription())
        .image(post.getImage())
//        .likes(post.getLikes())
//        .watched(post.getWatched()+1)
        .replyList(replyList)
        .createdAt(post.getCreatedAt())
        .build();
  }
}
