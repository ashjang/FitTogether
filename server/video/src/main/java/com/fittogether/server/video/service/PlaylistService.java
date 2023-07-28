package com.fittogether.server.video.service;

import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.video.domain.form.PlaylistForm;
import com.fittogether.server.video.domain.model.Playlist;
import com.fittogether.server.video.domain.repository.PlaylistRepository;
import com.fittogether.server.video.exception.VideoCustomException;
import com.fittogether.server.video.exception.VideoErrorCode;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaylistService {

  private final PlaylistRepository playlistRepository;

  public Playlist createPlaylist(Long userId, PlaylistForm form) {
    if(isPlaylistExist(userId, form.getPlaylistName())){
      throw new VideoCustomException(VideoErrorCode.SAME_PLAYLIST_NAME);
    }
    return playlistRepository.save(Playlist.of(userId, form));
  }

  public boolean isPlaylistExist(Long userId, String playlistName){
    // userId로 playlist 찾았을 때 존재하지 않는 경우, 즉 플레이리스트가 없을 때
    if(!playlistRepository.findByUser_UserId(userId).stream().findFirst().isPresent()){
      return false;
    }

    // userId로 playlist 찾았을 때, 만드려고 하는 playlist의 이름이 존재하는 경우
    if(playlistRepository.findByUserIdAndPlaylistName(userId, playlistName).isPresent()){
      return true;
    }else{
      return false;
    }
  }

}