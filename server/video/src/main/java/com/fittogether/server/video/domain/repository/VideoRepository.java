package com.fittogether.server.video.domain.repository;


import org.springframework.data.domain.Pageable;
import com.fittogether.server.video.domain.model.Video;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

  Optional<Video> findByTitle(String title);

  Optional<Video> findByVideoId(String youtubeVideoId);

  List<Video> findAllByKeywordOrderByIdDesc(String keyword, Pageable page);

  List<Video> findByKeywordAndIdLessThanOrderByIdDesc(String keyword, Long id, Pageable page);

  Boolean existsByIdLessThan(Long id);

}
