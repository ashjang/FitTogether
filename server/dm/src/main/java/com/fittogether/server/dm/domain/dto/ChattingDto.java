package com.fittogether.server.dm.domain.dto;

import com.fittogether.server.dm.domain.entity.ChatRoom;
import com.fittogether.server.dm.domain.entity.Request;
import lombok.*;

@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Builder
public class ChattingDto {

    private Long senderId; // 매칭 요쳥하는 유저 아이디 값
    private Long receiverId; //메칭 요청받는 유저 아이디 값

    private boolean isMatched; // 매칭 수락여부
    private Long roomId; //  채팅방 아이디 값 (ChatRoom 채팅방아이디 값 참조)




    public static ChattingDto from(Request request , ChatRoom chatRoom){
        return ChattingDto.builder()
                .senderId(request.getSenderId())
                .receiverId(request.getReceiverId())
                .isMatched(request.isAccepted())
                .roomId(chatRoom.getChatRoomId())
                .build();
    }



}
