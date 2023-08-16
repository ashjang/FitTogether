package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.domain.model.ChildReply;
import com.fittogether.server.posts.domain.model.Image;
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

  private Long postId;
  private String userNickname;
  private Category category;
  private String title;
  private String description;
  private Long likeCount;
  private Long viewCount;
  private Long replyCount;
  private List<String> images;
  private String userImage;
  private boolean accessLevel;
  private boolean isLike;
  private List<ReplyDto> replyList;
  private List<ReplyDto> childReplyList;
  private List<String> hashtagList;
  private LocalDateTime createdAt;

  public static PostInfo from(Post post, List<Reply> replyList, List<ChildReply> childReplyList,
      Long totalCount, boolean isLike, Long incrementWatchedCount, List<Image> images,
      List<String> hashtagList, Long likeCount) {

    return PostInfo.builder()
        .postId(post.getId())
        .userNickname(post.getUser().getNickname())
        .category(post.getCategory())
        .title(post.getTitle())
        .description(post.getDescription())
        .images(images.stream().map(Image::getImageUrl).collect(Collectors.toList()))
        .userImage(post.getUser().getProfilePicture())
        .likeCount(likeCount)
        .viewCount(incrementWatchedCount)
        .replyCount(totalCount)
        .accessLevel(post.isAccessLevel())
        .isLike(isLike)
        .replyList(replyList.stream().map(ReplyDto::from).collect(Collectors.toList()))
        .childReplyList(childReplyList.stream().map(ReplyDto::fromChild).collect(Collectors.toList()))
        .hashtagList(hashtagList)
        .createdAt(post.getCreatedAt())
        .build();
  }
}