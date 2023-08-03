package com.fittogether.server.posts.domain.repository;

import com.fittogether.server.posts.domain.model.Like;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.user.domain.model.User;
import javax.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

public interface LikeRepository extends JpaRepository<Like, Long> {
  @Lock(LockModeType.PESSIMISTIC_WRITE)
  Long countByPostId(Long postId);

  void deleteByPostAndUser(Post post, User user);

  Like findByPostAndUser(Post post, User user);
}
