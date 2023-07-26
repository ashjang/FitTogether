package com.fittogether.server.posts.domain.repository;


import com.fittogether.server.posts.domain.model.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {

  Hashtag findByKeyword(String keyword);

}