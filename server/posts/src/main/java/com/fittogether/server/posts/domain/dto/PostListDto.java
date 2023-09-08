package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.domain.model.Post;
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
public class PostListDto {
  private Long postId;
  private String title;
  private String userNickname;
  private String userImage;
  private Category category;
  private boolean accessLevel;
  private Long likeCount;
  private Long viewCount;
  private List<String> hashtags;

  public static PostListDto from(Post post, List<String> hashtags) {
    return PostListDto.builder()
        .postId(post.getId())
        .title(post.getTitle())
        .userNickname(post.getUser().getNickname())
        .userImage(post.getUser().getProfilePicture())
        .category(post.getCategory())
        .accessLevel(post.isAccessLevel())
        .likeCount(post.getLikes())
        .viewCount(post.getWatched())
        .hashtags(hashtags)
        .build();
  }
}