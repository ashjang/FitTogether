package com.fittogether.server.video.domain.dto;

import com.fittogether.server.video.domain.model.Video;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class VideoPageDto {

  private Long id;
  private String videoId;
  private String title;
  private String thumbnail;
  private String keyword;

  public static VideoPageDto from(Video video){
    return VideoPageDto.builder()
        .id(video.getId())
        .videoId(video.getVideoId())
        .title(video.getTitle())
        .thumbnail(video.getThumbnail())
        .keyword(video.getKeyword())
        .build();
  }

}
