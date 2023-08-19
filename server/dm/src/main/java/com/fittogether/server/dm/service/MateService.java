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

import java.util.ArrayList;
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
            String receiverNickname
    ) {

        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NOT_FOUND_USER);
        }


        UserVo userVo = jwtProvider.getUserVo(token);

        User sender = userRepository.findByNickname(userVo.getNickname())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        User receiver = userRepository.findByNickname(receiverNickname)
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));


        Request request = Request.builder()
                .senderId(sender)
                .receiverId(receiver)
                .senderNickname(sender.getNickname())
                .receiverNickname(receiver.getNickname())
                .isAccepted(false)
                .build();


        requestRepository.save(request);


        return request;
    }


    //운동 메이트 수락
    @Transactional
    public void mateAccept(
            String token,
            String senderNickname
    ) {
        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NOT_FOUND_USER);
        }

        UserVo userVo = jwtProvider.getUserVo(token);

        //사용자
        User user = userRepository.findByNickname(userVo.getNickname())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));


        //수락 요청을 보낸사람  (수락한 사람은 현재 사용자)
        User sender = userRepository.findByNickname(senderNickname)
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));


        Request request = requestRepository.findAllBySenderNicknameAndReceiverNickname(sender.getNickname(), user.getNickname());
        if (request == null) {
            throw new RequestNotFoundException("REQUEST_NOT_FOUND_EXCEPTION");
        }
        request.setAccepted(true);


    }


    public List<Request> requestLists(String token) {

        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NOT_FOUND_USER);
        }

        UserVo userVo = jwtProvider.getUserVo(token);
        User userNickname = userRepository.findByNickname(userVo.getNickname())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));


        // 로그인한 사용자가 메이트 요청을 보낸 경우
        List<Request> sentRequests = requestRepository.findAllBySenderNicknameAndIsAccepted(
                userNickname.getNickname(),
                true);

        // 로그인한 사용자가 메이트 요청을 받아 수락한 경우
        List<Request> receivedRequests = requestRepository.findAllByReceiverNicknameAndIsAccepted(
                userNickname.getNickname(),
                true);

        // 두 반환값 합침
        List<Request> mateList = new ArrayList<>();
        mateList.addAll(sentRequests);
        mateList.addAll(receivedRequests);


        return mateList;
    }




}
