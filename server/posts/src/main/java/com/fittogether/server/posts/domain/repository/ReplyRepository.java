package com.fittogether.server.posts.domain.repository;

import com.fittogether.server.posts.domain.model.Reply;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
  List<Reply> findByPostId(Long postId);
}
