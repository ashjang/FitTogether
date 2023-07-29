package com.fittogether.server.user.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.user.domain.dto.UpdateUserForm;
import com.fittogether.server.user.domain.dto.UserDto;
import com.fittogether.server.user.domain.dto.UserType;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        User user = userRepository.findById(userVo.getUserId())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        return UserDto.from(user);
    }

    // 회원정보 수정
    @Transactional
    public UserDto updateMyInfo(String token, UpdateUserForm form) {
        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NEED_TO_SIGNIN);
        }

        UserVo userVo = jwtProvider.getUserVo(token);
        User user = userRepository.findById(userVo.getUserId())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        if (user.getUserType() == UserType.FITTOGETHER) {
            user.setPassword(form.getPassword());
        }
        user.setProfilePicture(form.getProfilePicture());
        user.setExerciseChoice(form.getExerciseChoice());
        user.setGender(form.isGender());
        user.setIntroduction(form.getIntroduction());
        user.setPublicInfo(form.isPublicInfo());

        return UserDto.from(user);
    }

    // 다른 회원 프로필 조회
    public UserDto getUserInfo(String token, Long userId) {
        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NEED_TO_SIGNIN);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        if (!user.isPublicInfo()) {
            throw new UserCustomException(UserErrorCode.PRIVATE_USER);
        }

        return UserDto.builder()
                .userId(userId)
                .nickname(user.getNickname())
                .gender(user.isGender())
                .introduction(user.getIntroduction())
                .exerciseChoice(user.getExerciseChoice())
                .build();
    }

}
