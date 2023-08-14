package com.fittogether.server.dm.domain.dto;

import com.fittogether.server.dm.domain.entity.Message;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Builder
public class MessageDto {


    Long messageId;

    Long chatRoomId;

    Long senderId;
    String senderNickname;
    String contents;
    LocalDateTime sendDt;


    public static MessageDto from(Message message){
        return MessageDto.builder()
                .chatRoomId(message.getChatRoomId().getChatRoomId())
                .senderId(message.getSenderId().getUserId())
                .senderNickname(message.getSenderNickname())
                .contents(message.getContents())
                .sendDt(message.getSendDt())
                .build();
    }

}