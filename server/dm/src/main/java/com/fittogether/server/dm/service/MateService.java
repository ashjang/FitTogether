package com.fittogether.server.dm.service;


import com.fittogether.server.dm.domain.entity.Request;
import com.fittogether.server.dm.domain.repository.RequestRepository;
import com.fittogether.server.dm.exception.MateExceptionCode;
import com.fittogether.server.dm.exception.ValidateErrorCode;
import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MateService {
    private final RequestRepository requestRepository;

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;


    // 운동 메이트 요청
    @Transactional
    public Request mateRequest(
            String token,
            Long receiver
    ) {
        if (!jwtProvider.validateToken(token)) {
            throw new ValidateErrorCode("유효하지 않은 토큰입니다");
        }

        UserVo userVo = jwtProvider.getUserVo(token);

        User senderId = userRepository.findById(userVo.getUserId())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        User receiverId = userRepository.findById(receiver)
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        Request request = Request.builder()
                .senderId(senderId)
                .receiverId(receiverId)
                .build();


        requestRepository.save(request);


        return request;
    }


    //운동 메이트 수락
    @Transactional
    public void mateAccept(
            String token,
            Long receiverId,
            boolean is_matched
    ) {
        if (!jwtProvider.validateToken(token)) {
            throw new ValidateErrorCode("유효하지 않은 토큰입니다");
        }

        UserVo userVo = jwtProvider.getUserVo(token);


        User sender = userRepository.findById(userVo.getUserId())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));


        if (!is_matched) {
            throw new MateExceptionCode("요청 거절");
        } else {
            Request request = requestRepository.findAllBySenderIdAndReceiverId(sender, receiver);

            request.setAccepted(true);
            requestRepository.save(request);
        }

    }


    public List<Request> requestLists(String token) {

        if (!jwtProvider.validateToken(token)) {
            throw new ValidateErrorCode("유효하지 않은 토큰입니다");
        }

        UserVo userVo = jwtProvider.getUserVo(token);
        User senderId = userRepository.findById(userVo.getUserId())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));


        List<Request> mateList = requestRepository.findAllBySenderId(senderId);

        return mateList;
    }


}
