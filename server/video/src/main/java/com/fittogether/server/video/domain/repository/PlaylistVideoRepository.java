package com.fittogether.server.video.domain.repository;

import com.fittogether.server.video.domain.model.PlaylistVideo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistVideoRepository extends JpaRepository<PlaylistVideo, Long> {

  Optional<PlaylistVideo> findByPlaylist_PlaylistIdAndVideo_VideoId(Long playlistId, Long videoId);
}
