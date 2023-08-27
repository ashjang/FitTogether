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
    String contents;



}
