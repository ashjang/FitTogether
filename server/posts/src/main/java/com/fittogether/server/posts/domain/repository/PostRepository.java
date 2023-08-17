package com.fittogether.server.posts.domain.repository;

import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.type.Category;
import com.fittogether.server.user.domain.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PostRepository extends JpaRepository<Post, Long> {

  Optional<List<Post>> findAllByUserOrderByCreatedAtDesc(User user);


  Optional<List<Post>> findByCategoryOrderByCreatedAtDesc(Category keyword);

  Optional<List<Post>> findByTitleContainingOrderByCreatedAtDesc(String title);

  Optional<List<Post>> findAllByOrderByCreatedAtDesc();
}
