package com.fittogether.server.dm.service;

import com.fittogether.server.dm.domain.dto.RequestDto;
import com.fittogether.server.dm.domain.dto.RequestForm;
import com.fittogether.server.dm.domain.entity.Request;
import com.fittogether.server.dm.domain.repository.RequestRepository;
import com.fittogether.server.dm.exception.MateExceptionCode;
import com.fittogether.server.domain.token.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MateService {
    private final RequestRepository requestRepository;

    private final JwtProvider jwtProvider;


    // 운동 메이트 요청
    public RequestDto mateRequest(
            //String token,
            RequestForm requestForm
    ) {
        /* if (!jwtProvider.validateToken(token)) {
            throw new validateErrorCode("유효하지 않은 토큰입니다");
        }
        */
        Request request = Request.from(requestForm);

        requestRepository.save(request);


        return RequestDto.from(request);
    }


    //운동 메이트 수락
    public void mateAccept(Long senderId, boolean is_matched) {
         /* if (!jwtProvider.validateToken(token)) {
            throw new validateErrorCode("유효하지 않은 토큰입니다");
        }
        */

        if (!is_matched) {
            throw new MateExceptionCode("요청 거절");
        }
        Request request = requestRepository.findAllBySenderId(senderId);
        request.setAccepted(true);

        requestRepository.save(request);


    }


}
