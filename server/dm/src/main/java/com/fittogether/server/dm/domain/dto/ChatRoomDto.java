package com.fittogether.server.dm.domain.dto;

import com.fittogether.server.dm.domain.entity.ChatRoom;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomDto {
    private Long chatRoomId; // 채팅방 아이디 값
    private LocalDateTime chatRoomDt;// 채팅방 생성 시간

    public ChatRoomDto(LocalDateTime now) {
        this.chatRoomDt=now;
    }




}
