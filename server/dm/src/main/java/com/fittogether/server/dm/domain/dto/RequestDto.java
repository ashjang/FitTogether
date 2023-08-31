package com.fittogether.server.dm.domain.dto;

import com.fittogether.server.dm.domain.entity.Request;
import lombok.*;

@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Builder
public class RequestDto {


    private String senderNickname; //매칭 요청하는 유저 닉네임

    private String receiverNickname; // 매창 요청받는 유저 닉네임

    private boolean isAccept; //매칭 수락여부


    public static RequestDto from(Request request) {
        return RequestDto.builder()
                .senderNickname(request.getSenderNickname())
                .receiverNickname(request.getReceiverNickname())
                .isAccept(request.isAccepted())
                .build();
    }

}
