package com.fittogether.server.user.controller;

import com.fittogether.server.user.service.LocationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;

    @ApiOperation(value = "현재 나의 위치 업데이트")
    @PutMapping
    public ResponseEntity<?> updateMyLocation(@RequestHeader(name = "X-AUTH-TOKEN") String token,
                                              @RequestParam("lat") Double latitude, @RequestParam("long") Double longitude) {

        locationService.updateMyLocation(token, latitude, longitude);
        return ResponseEntity.ok().body("나의 위치를 업데이트 완료");
    }
}
