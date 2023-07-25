package com.fittogether.server.posts.domain.repository;

import com.fittogether.server.posts.domain.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PostRepository extends JpaRepository<Post, Long> {

}
