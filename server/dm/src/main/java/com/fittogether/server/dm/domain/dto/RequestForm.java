package com.fittogether.server.dm.domain.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RequestForm {



    private Long senderId; //메이트 요청 보낸 사람의 id값
    private Long receiverId; //메이트 요청을 받는 유저의 id값





}
