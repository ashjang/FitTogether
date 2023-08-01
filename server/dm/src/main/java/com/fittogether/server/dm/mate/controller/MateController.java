package com.fittogether.server.dm.mate.controller;

import com.fittogether.server.dm.domain.dto.RequestDto;
import com.fittogether.server.dm.domain.entity.Request;
import com.fittogether.server.dm.service.MateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PutMapping("/matching/{receiverId}")
    public ResponseEntity<Object> mateAccept(
            @RequestHeader("X-AUTH-TOKEN") String token,
            @PathVariable Long receiverId,
            @RequestParam boolean is_matched
    ){
        mateService.mateAccept(token,receiverId,is_matched);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("status", "success");
        responseData.put("message", "메이트 수락 완료");

        return ResponseEntity.ok(responseData);
    }

    @GetMapping("/matching/requests/lists")
    public List<Request> requestLists(
           @RequestHeader("X-AUTH-TOKEN") String token
    ){
        return mateService.requestLists(token);
    }

}
