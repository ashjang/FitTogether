package com.fittogether.server.dm.domain.dto;

import com.fittogether.server.dm.domain.entity.ChatRoom;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    public static List<ChatRoomDto> listFrom(List<ChatRoom> chatRoomList) {
        return chatRoomList.stream()
                .map(chatRoom -> ChatRoomDto.builder()
                        .chatRoomId(chatRoom.getChatRoomId())
                        .senderNickname(chatRoom.getSenderNickname())
                        .receiverNickname(chatRoom.getReceiverNickname())
                        .chatRoomDt(chatRoom.getChatRoomDt())
                        .build())
                .collect(Collectors.toList());
    }
}