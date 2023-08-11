package com.fittogether.server.user.controller;

import com.fittogether.server.user.domain.dto.AnotherUserDto;
import com.fittogether.server.user.domain.dto.UpdateUserForm;
import com.fittogether.server.user.domain.dto.UserDto;
import com.fittogether.server.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @ApiOperation(value = "회원정보 수정", response = UserDto.class)
    @PutMapping("/my")
    public ResponseEntity<UserDto> updateMyInfo(@RequestHeader(name = "X-AUTH-TOKEN") String token,
                                                @RequestBody UpdateUserForm form) {
        return ResponseEntity.ok(
                userService.updateMyInfo(token, form)
        );
    }

    @ApiOperation(value = "유저 프로필 조회", response = AnotherUserDto.class)
    @GetMapping()
    public ResponseEntity<AnotherUserDto> getUserInfo(@RequestHeader(name = "X-AUTH-TOKEN") String token,
                                                      @RequestParam("id") Long userId) {
        return ResponseEntity.ok(
                userService.getUserInfo(token, userId)
        );
    }

}
