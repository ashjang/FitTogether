package com.fittogether.server.dm.domain.entity;

import com.fittogether.server.dm.domain.dto.ChatRoomDto;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoom {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long chatRoomId;


    private LocalDateTime chatRoomDt;




}
