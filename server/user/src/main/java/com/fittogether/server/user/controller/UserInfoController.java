package com.fittogether.server.user.controller;

import com.fittogether.server.user.domain.dto.UserDto;
import com.fittogether.server.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserInfoController {
    private final UserService userService;

    @ApiOperation(value = "나의 정보 가져오기", response = UserDto.class)
    @GetMapping("/my")
    public ResponseEntity<UserDto> getMyInfo(@RequestHeader(name = "X-AUTH-TOKEN") String token) {
        return ResponseEntity.ok(
                userService.getMyInfo(token)
        );
    }
}
