package com.fittogether.server.dm.mate.controller;

import com.fittogether.server.dm.domain.dto.RequestDto;
import com.fittogether.server.dm.domain.dto.RequestListDto;
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
            @RequestParam Long receiverId
    ){
        return ResponseEntity.ok(RequestDto.from(mateService.mateRequest(
                 token ,receiverId
        )));
    }

    @PutMapping("/matching/accept")
    public ResponseEntity<Object> mateAccept(
            @RequestHeader("X-AUTH-TOKEN") String token,
            @RequestParam Long senderId
    ){
        mateService.mateAccept(token,senderId);


        return ResponseEntity.ok().body("메이트 수락 완료");
    }

    @GetMapping("/matching/requests/lists")
    public List<RequestListDto> requestLists(
            @RequestHeader("X-AUTH-TOKEN") String token
    ){
        return RequestListDto.from(mateService.requestLists(token));

    }

}
