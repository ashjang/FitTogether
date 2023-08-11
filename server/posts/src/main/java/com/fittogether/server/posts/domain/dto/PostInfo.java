package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.domain.model.ChildReply;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.model.Reply;
import com.fittogether.server.posts.type.Category;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostInfo {

  private Long userId;
  private Category category;
  private String title;
  private String description;
  private String image;
  private Long likeCount;
  private Long viewCount;
  private Long replyCount;
  private boolean isLike;
  private List<ReplyDto> replyList;
  private List<ReplyDto> childReplyList;
  private LocalDateTime createdAt;

  public static PostInfo from(Post post, List<Reply> replyList, List<ChildReply> childReplyList, Long totalCount, boolean isLike, Long incrementWatchedCount) {

    return PostInfo.builder()
        .userId(post.getUser().getUserId())
        .category(post.getCategory())
        .title(post.getTitle())
        .description(post.getDescription())
        .image(post.getImage())
        .likeCount(post.getLikes())
        .viewCount(incrementWatchedCount)
        .replyCount(totalCount)
        .isLike(isLike)
        .replyList(replyList.stream().map(ReplyDto::from).collect(Collectors.toList()))
        .childReplyList(childReplyList.stream().map(ReplyDto::fromChild).collect(Collectors.toList()))
        .createdAt(post.getCreatedAt())
        .build();
  }
}