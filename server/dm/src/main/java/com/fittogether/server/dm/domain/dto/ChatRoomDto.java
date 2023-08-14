package com.fittogether.server.dm.domain.dto;

import com.fittogether.server.dm.domain.entity.ChatRoom;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Builder
public class ChatRoomDto {

    Long chatRoomId;


    Long senderId;


    Long receiverId;

    String senderNickname;
    String receiverNickname;
    LocalDateTime chatRoomDt;

    public static ChatRoomDto from(ChatRoom chatRoom) {
        return ChatRoomDto.builder()
                .chatRoomId(chatRoom.getChatRoomId())
                .senderId(chatRoom.getSenderId().getUserId())
                .receiverId(chatRoom.getReceiverId().getUserId())
                .senderNickname(chatRoom.getSenderNickname())
                .receiverNickname(chatRoom.getReceiverNickname())
                .chatRoomDt(chatRoom.getChatRoomDt())
                .build();
    }


}