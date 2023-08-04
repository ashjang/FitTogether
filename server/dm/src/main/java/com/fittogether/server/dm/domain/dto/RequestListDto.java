package com.fittogether.server.dm.domain.dto;

import com.fittogether.server.dm.domain.entity.Request;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Builder
public class RequestListDto {


    private String senderId; //매칭 요청하는 유저 아이디 값

    private String receiverId; // 매창 요청받는 유저 아이디 값

    private boolean isAccept; //매칭 수락여부


    public static List<RequestListDto> from(List<Request> mateList) {
        List<RequestListDto> requestListDto=new ArrayList<>();

        for (Request request : mateList) {
            RequestListDto dto=RequestListDto.builder()
                    .senderId(request.getSenderId().getNickname())
                    .receiverId(request.getReceiverId().getNickname())
                    .isAccept(request.isAccepted())
                    .build();

            requestListDto.add(dto);

        }
        return requestListDto;
    }

}