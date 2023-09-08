package com.fittogether.server.video.domain.repository;

import com.fittogether.server.video.domain.model.PlaylistVideo;
import com.fittogether.server.video.domain.model.Video;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistVideoRepository extends JpaRepository<PlaylistVideo, Long> {

  Optional<PlaylistVideo> findByPlaylist_PlaylistIdAndVideo_Id(Long playlistId, Long videoId);

  Optional<PlaylistVideo> findAllByPlaylist_PlaylistId(Long PlaylistId);

  void deleteAllByPlaylist_PlaylistId(Long playlistId);

  void deleteByPlaylist_PlaylistIdAndVideo_Id(Long playlistId, Long videoId);

  List<PlaylistVideo> findAllByPlaylist_PlaylistIdOrderByModifiedAtDesc(Long playlistId, Pageable page);

  List<PlaylistVideo> findByPlaylist_PlaylistIdAndIdLessThanOrderByIdDesc(Long playlistId, Long id, Pageable page);

  Boolean existsByIdLessThan(Long id);

  // playlistId로 playlist 와 video 받아옴
  @Query("select pv from PlaylistVideo pv "
  + "join fetch pv.playlist "
  + "join fetch pv.video "
  + "where pv.playlist.playlistId = :id")
  List<PlaylistVideo> findByPlaylistId(@Param("id") Long id);
}
