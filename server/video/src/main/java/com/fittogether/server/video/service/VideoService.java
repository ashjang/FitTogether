package com.fittogether.server.video.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import com.fittogether.server.video.domain.form.VideoForm;
import com.fittogether.server.video.domain.model.Playlist;
import com.fittogether.server.video.domain.model.PlaylistVideo;
import com.fittogether.server.video.domain.model.Video;
import com.fittogether.server.video.domain.repository.PlaylistRepository;
import com.fittogether.server.video.domain.repository.PlaylistVideoRepository;
import com.fittogether.server.video.domain.repository.VideoRepository;
import com.fittogether.server.video.exception.VideoCustomException;
import com.fittogether.server.video.exception.VideoErrorCode;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VideoService {

  private final PlaylistVideoRepository playlistVideoRepository;
  private final PlaylistRepository playlistRepository;
  private final UserRepository userRepository;
  private final VideoRepository videoRepository;
  private final JwtProvider provider;

  @Transactional
  public PlaylistVideo addVideoToPlaylist(String token, String targetName, VideoForm form) {
    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    Playlist playlist = playlistRepository.findByUser_UserIdAndPlaylistName(user.getUserId(),
        targetName).orElseThrow(() -> new VideoCustomException(VideoErrorCode.NOT_FOUND_PLAYLIST));

    Video video = videoRepository.findByUrl(form.getVideoUrl())
        .orElse(Video.from(form));

    if (playlistVideoRepository.findByPlaylist_PlaylistIdAndVideo_VideoId(
            playlist.getPlaylistId(), video.getVideoId())
        .isPresent()) {
      throw new VideoCustomException(VideoErrorCode.ALREADY_EXIST_VIDEO);
    }

    PlaylistVideo playlistVideo = PlaylistVideo.of(playlist, video);
//    playlist.addVideo(playlistVideo);

    return playlistVideoRepository.save(playlistVideo);
  }

  public List<PlaylistVideo> getVideoInPlaylist(String token, String targetName) {
    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    Playlist playlist = playlistRepository.findByUser_UserIdAndPlaylistName(user.getUserId(),
        targetName).orElseThrow(() -> new VideoCustomException(VideoErrorCode.NOT_FOUND_PLAYLIST));

    return playlistVideoRepository.findByPlaylistId(playlist.getPlaylistId());

  }

  @Transactional
  public void deleteVideoInPlaylist(String token, String targetName, Long videoId) {
    UserVo userVo = provider.getUserVo(token);

    User user = userRepository.findById(userVo.getUserId())
        .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

    Playlist playlist = playlistRepository.findByUser_UserIdAndPlaylistName(user.getUserId(),
        targetName).orElseThrow(() -> new VideoCustomException(VideoErrorCode.NOT_FOUND_PLAYLIST));

    if (!videoRepository.findById(videoId).isPresent()) {
      throw new VideoCustomException(VideoErrorCode.NOT_FOUND_VIDEO);
    }

    playlistVideoRepository.deleteByPlaylist_PlaylistIdAndVideo_VideoId(
        playlist.getPlaylistId(), videoId
    );
  }

}
