package com.fittogether.server.dm.service;


import com.fittogether.server.dm.domain.entity.Request;
import com.fittogether.server.dm.domain.repository.RequestRepository;
import com.fittogether.server.dm.exception.RequestNotFoundException;
import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
            throw new UserCustomException(UserErrorCode.NOT_FOUND_USER);
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
            Long senderId
    ) {
        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NOT_FOUND_USER);
        }

        UserVo userVo = jwtProvider.getUserVo(token);

        //사용자
        User user = userRepository.findById(userVo.getUserId())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));


        //수락 요청을 보낸사람  (수락한 사람은 현재 사용자)
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));


        Request request = requestRepository.findAllBySenderIdAndReceiverId(sender, user);
        if(request==null){
            throw new RequestNotFoundException("REQUEST_NOT_FOUND_EXCEPTION");
        }
        request.setAccepted(true);
        requestRepository.save(request);



    }

    }
