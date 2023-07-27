package com.fittogether.server.user.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.user.domain.dto.UserDto;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    // 나의 회원정보 가져오기
    public UserDto getMyInfo(String token) {
        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NEED_TO_SIGNIN);
        }

        UserVo userVo = jwtProvider.getUserVo(token);
        User user = userRepository.findByUserId(userVo.getUserId())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        return UserDto.from(user);
    }
}
