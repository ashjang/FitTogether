package com.fittogether.server.user.service;

import com.fittogether.server.domain.token.AES256Utils;
import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.user.client.MailgunClient;
import com.fittogether.server.user.client.SendMailForm;
import com.fittogether.server.user.domain.dto.SignInForm;
import com.fittogether.server.user.domain.dto.UserType;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.bouncycastle.jcajce.provider.symmetric.AES;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserSignInService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final MailgunClient mailgunClient;

    // 로그인
    public String signIn(SignInForm form) {
        User user = userRepository.findByNicknameAndPassword(form.getNickname(), AES256Utils.encrypt(form.getPassword()))
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

    public String findID(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        return user.getNickname();
    }

    // 비밀번호 찾기
    @Transactional
    public void findPW(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        String code = RandomStringUtils.random(8, true, true);
        user.setPassword(AES256Utils.encrypt(code));
        SendMailForm sendMailForm = SendMailForm.builder()
                .from("fittogether@techtravelers.com")
                .to(user.getEmail())
                .text(sendEmailBody(user.getEmail(), user.getNickname(), code))
                .subject("[임시 비밀번호]")
                .build();
        mailgunClient.sendEmail(sendMailForm);
    }

    private String sendEmailBody(String email, String name, String code) {
        StringBuilder sb = new StringBuilder();
        return sb.append("안녕하세요, ").append(name).append("님! 아래의 임시 비밀번호를 이용하여 로그인해주세요.\n\n")
                .append("임시 비밀번호: ")
                .append(code).toString();
    }
}
