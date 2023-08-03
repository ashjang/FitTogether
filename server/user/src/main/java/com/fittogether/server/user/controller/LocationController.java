package com.fittogether.server.user.controller;

import com.fittogether.server.user.service.LocationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;

    @ApiOperation(value = "현재 나의 위치 업데이트")
    @PutMapping
    public ResponseEntity<?> updateMyLocation(@RequestHeader(name = "X-AUTH-TOKEN") String token,
                                              @RequestParam("lat") Double latitude, @RequestParam("long") Double longitude) {
        Map<String, String> res = new HashMap<>();

        if (locationService.updateMyLocation(token, latitude, longitude)) {
            res.put("status", "success");
            res.put("message", "나의 위치를 업데이트 완료");
        } else {
            res.put("status", "fail");
            res.put("message", "나의 위치 업데이트 실패");
        }

        return ResponseEntity.ok(res);
    }
}
