package com.fittogether.server.dm.domain.repository;

import com.fittogether.server.dm.domain.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MessageRepository extends JpaRepository<Message,Long> {

    @Query("SELECT MAX(m.messageId) FROM Message m")
    Long findMaxMessageId();
}
