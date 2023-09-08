package com.fittogether.server.posts.domain.repository;

import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.type.Category;
import com.fittogether.server.user.domain.model.User;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PostRepository extends JpaRepository<Post, Long> {

  Optional<Page<Post>> findAllByUserOrderByCreatedAtDesc(User user, Pageable pageable);


  Optional<Page<Post>> findByCategoryOrderByCreatedAtDesc(Category keyword, Pageable pageable);

  Optional<Page<Post>> findByTitleContainingOrderByCreatedAtDesc(String title, Pageable pageable);

  Optional<Page<Post>> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
