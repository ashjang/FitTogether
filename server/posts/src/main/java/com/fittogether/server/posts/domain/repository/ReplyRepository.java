package com.fittogether.server.posts.domain.repository;

import com.fittogether.server.posts.domain.model.Reply;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

  Optional<List<Reply>> findAllByPostId(Long postId);

  Optional<Reply> findByPostIdAndId(Long postId, Long replyId);

  Optional<Long> countByPostId(Long postId);

}
