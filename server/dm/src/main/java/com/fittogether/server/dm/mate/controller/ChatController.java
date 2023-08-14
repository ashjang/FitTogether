package com.fittogether.server.dm.mate.controller;

import com.fittogether.server.dm.domain.dto.MessageDto;
import com.fittogether.server.dm.domain.dto.MessageForm;
import com.fittogether.server.dm.service.DmService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final DmService dmService;


    /**
     * MessageMapping의 경로가 "/dm/message" 이지만
     * ChatConfig의 setApplicationDestinationPrefixes()를 통해 prefix를 "/pub"으로 해줬기 때문에
     * 실질 경로는 "pub/dm/message"가 됨.
     * 즉 메세지를 발행할땐 클라이언트측에서 /pub/dm/message 주소로 보내면됨.
     */
    @MessageMapping("/dm/message")
    public void message(
            //@RequestHeader("X-AUTH-TOKEN") String token,
            MessageForm messageForm
    ) {
        //메세지 정보 DB 저장
        MessageDto messageDto=MessageDto.from(dmService.sendMessage(//token ,
                messageForm)) ;

        //클라이언트에서 "/pub/dm/message"의 경로로 메시지를 보내는 요청을 하면,
        //메시지 Controller가 받아서 "sub/dm/room/roomId"를 구독하고 있는 클라이언트에게 메시지를 전달하게 됨.
        messagingTemplate.convertAndSend("/sub/dm/room/" + messageDto.getChatRoomId(), messageDto);
    }
}