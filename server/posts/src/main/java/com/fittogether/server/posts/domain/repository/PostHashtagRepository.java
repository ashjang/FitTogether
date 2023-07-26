package com.fittogether.server.posts.domain.repository;


import com.fittogether.server.posts.domain.model.PostHashtag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostHashtagRepository extends JpaRepository<PostHashtag, Long> {
  List<PostHashtag> findByPostId(Long postId);
}