package com.fittogether.server.dm.domain.repository;

import com.fittogether.server.dm.domain.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {


    List<ChatRoom> findAllBySenderNickname(String senderNickname);

    List<ChatRoom> findAllByReceiverNickname(String senderNickname);

}