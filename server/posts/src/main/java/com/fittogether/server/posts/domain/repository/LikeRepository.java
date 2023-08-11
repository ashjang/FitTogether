package com.fittogether.server.posts.domain.repository;

import com.fittogether.server.posts.domain.model.Like;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.user.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
  Long countByPostId(Long postId);

  void deleteByPostAndUser(Post post, User user);

  boolean existsByPost(Post post);

  boolean existsByPostAndUser(Post post, User user);
}
