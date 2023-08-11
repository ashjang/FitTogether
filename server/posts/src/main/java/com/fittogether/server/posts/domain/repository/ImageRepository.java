package com.fittogether.server.posts.domain.repository;

import com.fittogether.server.posts.domain.model.Image;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
  Image findByImageUrl(String imageUrl);

  List<Image> findByPostId(Long postId);
}
