package com.fittogether.server.posts.domain.dto;

import com.fittogether.server.posts.domain.model.ChildReply;
import com.fittogether.server.posts.domain.model.Reply;
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
public class ReplyListDto {
  private List<ReplyDto> replyList;
  private List<ReplyDto> childReplyList;
  private Long replyCount;


  public static ReplyListDto fromList(List<Reply> replyList, List<ChildReply> childReplyList, Long replyCount) {
    return ReplyListDto.builder()
        .replyList(replyList.stream().map(ReplyDto::from).collect(Collectors.toList()))
        .childReplyList(childReplyList.stream().map(ReplyDto::fromChild).collect(Collectors.toList()))
        .replyCount(replyCount)
        .build();
  }
}
