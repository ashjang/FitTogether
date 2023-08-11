package com.fittogether.server.user.service;

import com.fittogether.server.user.domain.dto.SignUpForm;
import com.fittogether.server.user.domain.dto.UserDto;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserSignUpService {
    private final UserRepository userRepository;

    // 일반 회원가입
    @Transactional
    public UserDto signUp(SignUpForm form) {
        User user = userRepository.save(User.from(form));

        return UserDto.from(user);
    }

    // 닉네임 중복검사
    public boolean isExistNickname(String nickname) {
        if (userRepository.existsByNickname(nickname)) {
            return true;
        }

        return false;
    }

    // 이메일 중복검사
    public boolean isExistEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            return true;
        }

        return false;
    }
}
