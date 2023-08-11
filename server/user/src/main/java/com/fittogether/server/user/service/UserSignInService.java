package com.fittogether.server.user.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.user.domain.dto.SignInForm;
import com.fittogether.server.user.domain.dto.UserType;
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
        User user = userRepository.findByNicknameAndPassword(form.getNickname(), form.getPassword())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        // 소셜 로그인일 경우
        if (user.getUserType() != UserType.FITTOGETHER) {
            throw new UserCustomException(UserErrorCode.NOT_FOR_FITTOGETHER);
        }

        return jwtProvider.createToken(user.getNickname(), user.getUserId());
    }

    // 로그아웃
    public void signOut(String token) {
        if (jwtProvider.invalidateToken(token)) {
            throw new UserCustomException(UserErrorCode.CANNOT_LOGOUT);
        }
    }
}
