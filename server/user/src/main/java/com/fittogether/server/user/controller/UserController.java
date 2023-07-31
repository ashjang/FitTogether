package com.fittogether.server.user.controller;

import com.fittogether.server.user.domain.dto.SignInForm;
import com.fittogether.server.user.domain.dto.SignUpForm;
import com.fittogether.server.user.domain.dto.UserDto;
import com.fittogether.server.user.service.KakaoSignInService;
import com.fittogether.server.user.service.UserSignInService;
import com.fittogether.server.user.service.UserSignUpService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserSignUpService signUpService;
    private final UserSignInService signInService;
    private final KakaoSignInService kakao;

    @ApiOperation(value = "회원가입", response = UserDto.class)
    @PostMapping("/signup")
    public ResponseEntity<UserDto> signUp(@RequestBody SignUpForm form) {
        return ResponseEntity.ok(
                signUpService.signUp(form)
        );
    }

    @ApiOperation(value = "로그인", response = String.class)
    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestBody SignInForm form) {
        return ResponseEntity.ok(
                signInService.signIn(form)
        );
    }

    @GetMapping("/signin/kakao")
    public ResponseEntity<String> kakaoSignIn(@RequestParam("code") String code) {
        String accessToken = kakao.getAccessToken(code);
        UserDto userDto = kakao.getUserInfo(accessToken);
        return ResponseEntity.ok(
                kakao.signIn(userDto)
        );
    }
}