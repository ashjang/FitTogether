package com.fittogether.server.dm.mate.controller;


import com.fittogether.server.dm.domain.dto.ChatRoomDto;
import com.fittogether.server.dm.domain.dto.MessageDto;
import com.fittogether.server.dm.service.DmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class DmController {
    private final DmService dmService;


    // 받는사람과의 세션 방 생성
    @PostMapping("/dm/{receiverNickname}")
    public ResponseEntity<ChatRoomDto> createDmRoom(
            @RequestHeader("X-AUTH-TOKEN") String token,
            @PathVariable String receiverNickname
    ) {
        return ResponseEntity.ok(ChatRoomDto.from(dmService.createDmRoom(token, receiverNickname)));
    }


    //채팅방 목록 조회
    @GetMapping("/dm/lists")
    public List<ChatRoomDto> dmLists(
            @RequestHeader("X-AUTH-TOKEN") String token
    ) {
        return ChatRoomDto.listFrom(dmService.dmLists(token));
    }

    //채팅방 메세지 조회
    @GetMapping("/dm")
    public List<MessageDto> messageLists(
            @RequestHeader("X-AUTH-TOKEN") String token,
            @RequestParam Long chatRoomId
    ){
        return MessageDto.listFrom(dmService.messageLists(token,chatRoomId));
    }


}