package com.fittogether.server.dm.domain.repository;

import com.fittogether.server.dm.domain.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,Long> {


}
