package com.fittogether.server.video.domain.dto;

import com.fittogether.server.video.domain.model.PlaylistVideo;
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
public class PlaylistVideoDto {

  private String playlistName;
  private String videoId;
  private String videoTitle;
  private String thumbnail;

  public static PlaylistVideoDto from(PlaylistVideo playlistVideo) {
    return new PlaylistVideoDto(
        playlistVideo.getPlaylist().getPlaylistName(),
        playlistVideo.getVideo().getVideoId(),
        playlistVideo.getVideo().getTitle(),
        playlistVideo.getVideo().getThumbnail()
    );
  }

}
