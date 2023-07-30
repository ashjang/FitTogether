package com.fittogether.server.dm.domain.repository;

import com.fittogether.server.dm.domain.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<Request,Long> {
    Request findAllBySenderId(Long senderId);
    Request findAllByReceiverId(Long receiverId);
}
