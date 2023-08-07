package com.fittogether.server.video.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import com.fittogether.server.video.domain.form.PlaylistForm;
import com.fittogether.server.video.domain.model.Playlist;
import com.fittogether.server.video.domain.repository.PlaylistRepository;
import com.fittogether.server.video.exception.VideoCustomException;
import com.fittogether.server.video.exception.VideoErrorCode;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PlaylistService {

  private final PlaylistRepository playlistRepository;
  private final UserRepository userRepository;
  private final JwtProvider provider;

  @Transactional
  public Playlist createPlaylist(String token, PlaylistForm form) {
    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));


    if(playlistRepository.findByUser_UserIdAndPlaylistName(user.getUserId(), form.getPlaylistName()).isPresent()){
      throw new VideoCustomException(VideoErrorCode.ALREADY_EXIST_PLAYLIST_NAME);
    }

    return playlistRepository.save(Playlist.of(user, form));
  }

  public List<Playlist> readPlaylist(String token) {
    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    return playlistRepository.findByUser_UserId(user.getUserId());
  }

  @Transactional
  public Playlist updatePlaylist(String token, String targetName, PlaylistForm form) {
    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    Playlist playlist = playlistRepository.findByUser_UserIdAndPlaylistName(user.getUserId(),
            targetName)
        .orElseThrow(() -> new VideoCustomException(VideoErrorCode.NOT_FOUND_PLAYLIST));

    // 바꾸려고 하는 Playlist 이름이 바꿀 Playlist 이름과 같으면 에러 처리
    if (playlist.getPlaylistName().equals(form.getPlaylistName())) {
      throw new VideoCustomException(VideoErrorCode.SAME_PLAYLIST_NAME);
    }

    if (playlistRepository.findByUser_UserIdAndPlaylistName(user.getUserId(), form.getPlaylistName())
        .isPresent()){
      throw new VideoCustomException(VideoErrorCode.ALREADY_EXIST_PLAYLIST_NAME);
    }

    playlist.setPlaylistName(form.getPlaylistName());

    return playlist;
  }

  @Transactional
  public void deletePlaylist(String token, String targetName) {
    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    if (!playlistRepository.findByUser_UserIdAndPlaylistName(userVo.getUserId(), targetName)
        .isPresent()) {
      throw new VideoCustomException(VideoErrorCode.NOT_FOUND_PLAYLIST);
    }

    playlistRepository.deleteByUser_UserIdAndPlaylistName(user.getUserId(), targetName);
  }

}