package com.fittogether.server.posts.domain.repository;


import com.fittogether.server.posts.domain.model.ChildReply;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildReplyRepository extends JpaRepository<ChildReply, Long> {

  Optional<List<ChildReply>> findAllByPostId(Long Post);

  Optional<Long> countByPostId(Long postId);

}
