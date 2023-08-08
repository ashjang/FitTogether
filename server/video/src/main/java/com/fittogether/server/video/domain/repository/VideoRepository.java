package com.fittogether.server.video.domain.repository;

import com.fittogether.server.video.domain.model.Video;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

  Optional<Video> findByUrl(String url);

}
