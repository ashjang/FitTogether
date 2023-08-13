package com.fittogether.server.video.domain.repository;

import com.fittogether.server.video.domain.model.PlaylistVideo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistVideoRepository extends JpaRepository<PlaylistVideo, Long> {

  Optional<PlaylistVideo> findByPlaylist_PlaylistIdAndVideo_VideoId(Long playlistId, Long videoId);

  // playlistId로 playlist 와 video 받아옴
  @Query("select pv from PlaylistVideo pv "
  + "join fetch pv.playlist "
  + "join fetch pv.video "
  + "where pv.playlist.playlistId = :id")
  List<PlaylistVideo> findByPlaylistId(@Param("id") Long id);
}
