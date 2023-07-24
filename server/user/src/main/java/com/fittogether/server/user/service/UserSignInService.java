package com.fittogether.server.user.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.user.domain.dto.SignInForm;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSignInService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    // 로그인
    public String signIn(SignInForm form) {
        User user = userRepository.findByNickname(form.getNickname()).stream()
                .filter(users -> users.getPassword().equals(form.getPassword())).findFirst()
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        return jwtProvider.createToken(user.getNickname(), user.getUserId());
    }
}
