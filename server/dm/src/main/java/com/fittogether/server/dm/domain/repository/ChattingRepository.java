package com.fittogether.server.dm.domain.repository;

import com.fittogether.server.dm.domain.entity.Chatting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChattingRepository extends JpaRepository<Chatting,Long> {





}
