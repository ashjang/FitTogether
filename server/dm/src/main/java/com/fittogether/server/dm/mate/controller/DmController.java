package com.fittogether.server.dm.mate.controller;


import com.fittogether.server.dm.domain.dto.ChatRoomDto;
import com.fittogether.server.dm.service.DmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@RequiredArgsConstructor
@Controller
public class DmController {
    private final DmService dmService;



    // 받는사람과의 세션 방 생성
    @PostMapping("/dm/{receiverNickname}")
    public ResponseEntity<ChatRoomDto> createDmRoom(
            @RequestHeader("X-AUTH-TOKEN") String token,
            @PathVariable String receiverNickname
    ){
       return ResponseEntity.ok(ChatRoomDto.from(dmService.createDmRoom(token,receiverNickname)));
    }

    //dm 방 조회
   /*
    @PostMapping("/dm/lists")
    public ResponseEntity<ChatRoomDto> dmLists(
            @RequestHeader("X-AUTH-TOKEN") String token
    ){



        return null;
    }


    */

}