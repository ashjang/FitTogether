package com.fittogether.server.posts.domain.repository;


import com.fittogether.server.posts.domain.model.ChildReply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildReplyRepository extends JpaRepository<ChildReply, Long> {

  ChildReply findByReplyId(Long replyId);
}
