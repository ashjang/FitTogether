package com.fittogether.server.posts.domain.repository;

import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.user.domain.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PostRepository extends JpaRepository<Post, Long> {

  List<Post> findAllByUser(User user);
}
