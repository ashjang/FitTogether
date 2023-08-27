package com.fittogether.server.dm.domain.dto;

import com.fittogether.server.dm.domain.entity.Message;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
    LocalDateTime sendDate;


    public static MessageDto from(Message message){
        return MessageDto.builder()
                .chatRoomId(message.getChatRoomId().getChatRoomId())
                .senderId(message.getSenderId().getUserId())
                .senderNickname(message.getSenderNickname())
                .contents(message.getContents())
                .sendDate(message.getSendDate())
                .build();
    }

    public static List<MessageDto> listFrom(List<Message> messageList) {
        return messageList.stream()
                .map(message -> MessageDto.builder()
                        .chatRoomId(message.getChatRoomId().getChatRoomId())
                        .senderId(message.getSenderId().getUserId())
                        .senderNickname(message.getSenderNickname())
                        .contents(message.getContents())
                        .sendDate(message.getSendDate())
                        .build())
                .collect(Collectors.toList());
    }

}