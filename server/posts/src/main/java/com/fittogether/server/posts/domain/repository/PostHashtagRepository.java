package com.fittogether.server.posts.domain.repository;


import com.fittogether.server.posts.domain.model.PostHashtag;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostHashtagRepository extends JpaRepository<PostHashtag, Long> {
  Optional<List<PostHashtag>> findByPostId(Long postId);

  Optional<List<PostHashtag>> findAllByHashtagId(Long hashtagId);
}