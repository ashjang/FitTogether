package com.fittogether.server.dm.domain.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class MessageForm {


    Long chatRoomId;
    String senderNickname;  //token 테스트 불가로 인한 임시 발신인값.
    String contents;



}
