package com.fittogether.server.video.domain.repository;

import com.fittogether.server.video.domain.model.Playlist;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

  // userId로 플레이리스트 찾기
  List<Playlist> findByUser_UserId(Long userId);

  Optional<Playlist> findByUser_UserIdAndPlaylistName(Long userId, String playlistName);
}
