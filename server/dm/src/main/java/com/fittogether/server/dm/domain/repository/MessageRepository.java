package com.fittogether.server.dm.domain.repository;

import com.fittogether.server.dm.domain.entity.ChatRoom;
import com.fittogether.server.dm.domain.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message,Long> {

    @Query("SELECT MAX(m.messageId) FROM Message m")
    Long findMaxMessageId();

    List<Message> findAllByChatRoomId(Optional<ChatRoom> chatRoomId);
}
