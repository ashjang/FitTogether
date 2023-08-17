package com.fittogether.server.posts.domain.repository;

import com.fittogether.server.posts.domain.model.Image;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
  Image findByImageUrl(String imageUrl);

  Optional<List<Image>> findByPostId(Long postId);

  void deleteByPostId(Long postId);
}
