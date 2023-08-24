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
public class VideoDto {

  private String url;
  private String title;
  private String thumbnail;
  private String keyword;

  public static VideoDto from(Video video){
    return VideoDto.builder()
        .url(video.getUrl())
        .title(video.getTitle())
        .thumbnail(video.getThumbnail())
        .keyword(video.getKeyword())
        .build();
  }

}
