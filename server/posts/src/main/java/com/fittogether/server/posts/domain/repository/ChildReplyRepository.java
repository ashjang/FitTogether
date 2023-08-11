package com.fittogether.server.posts.domain.repository;


import com.fittogether.server.posts.domain.model.ChildReply;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildReplyRepository extends JpaRepository<ChildReply, Long> {

  List<ChildReply> findByReplyIdIn(List<Long> replyIds);

  Long countByPostId(Long postId);
}
