package com.fittogether.server.video.domain.dto;

import com.fittogether.server.video.domain.model.Playlist;
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
public class PlaylistDto {

  private String playlistName;

  public static PlaylistDto from(Playlist playlist) {
    return new PlaylistDto(playlist.getPlaylistName());
  }
}
