package com.fittogether.server.dm.mate.controller;

import com.fittogether.server.dm.domain.dto.RequestDto;
import com.fittogether.server.dm.domain.dto.RequestForm;
import com.fittogether.server.dm.service.MateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MateController {
    private final MateService mateService;




    @PostMapping("/matching/request")
    public ResponseEntity<RequestDto> mateRequest(
            @RequestHeader("X-AUTH-TOKEN") String token,
            @RequestBody RequestForm requestForm
    ){
        return ResponseEntity.ok(RequestDto.from(mateService.mateRequest(
                 token ,
                requestForm
        )));
    }

    @PutMapping("/matching/{senderId}/{receiverId}")
    public ResponseEntity<Object> mateAccept(
            @RequestHeader("X-AUTH-TOKEN") String token,
            @PathVariable Long senderId,
            @PathVariable Long receiverId,
            @RequestParam boolean is_matched
    ){
        mateService.mateAccept(token,senderId,receiverId,is_matched);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("status", "success");
        responseData.put("message", "메이트 수락 완료");

        return ResponseEntity.ok(responseData);
    }

}
