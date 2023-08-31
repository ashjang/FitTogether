package com.fittogether.server.dm.mate.controller;

import com.fittogether.server.dm.domain.dto.MateListDto;
import com.fittogether.server.dm.domain.dto.RequestDto;
import com.fittogether.server.dm.service.MateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MateController {
    private final MateService mateService;




    @PostMapping("/matching/request")
    public ResponseEntity<RequestDto> mateRequest(
            @RequestHeader("X-AUTH-TOKEN") String token,
            @RequestParam String receiverNickname
    ){
        return ResponseEntity.ok(RequestDto.from(mateService.mateRequest(
                 token ,receiverNickname
        )));
    }

    @PutMapping("/matching/accept")
    public ResponseEntity<Object> mateAccept(
            @RequestHeader("X-AUTH-TOKEN") String token,
            @RequestParam String senderNickname
    ){
        mateService.mateAccept(token,senderNickname);


        return ResponseEntity.ok().body("메이트 수락 완료");
    }

    @GetMapping("/matching/requests/lists")
    public List<MateListDto> requestLists(
            @RequestHeader("X-AUTH-TOKEN") String token
    ){
        return MateListDto.from(mateService.requestLists(token));

    }

}
