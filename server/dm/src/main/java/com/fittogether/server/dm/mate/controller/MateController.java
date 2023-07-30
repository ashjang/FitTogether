package com.fittogether.server.dm.mate.controller;

import com.fittogether.server.dm.domain.dto.RequestDto;
import com.fittogether.server.dm.domain.dto.RequestForm;
import com.fittogether.server.dm.service.MateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MateController {
    private final MateService mateService;

    public MateController(MateService mateService) {
        this.mateService = mateService;
    }



    @PostMapping("/matching/request")
    public ResponseEntity<RequestDto> mateRequest(
            //@RequestHeader("token") String token
            @RequestBody RequestForm requestForm
    ){
          return ResponseEntity.ok(mateService.mateRequest(requestForm));
    }




}
