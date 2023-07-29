package com.fittogether.server.dm.service;

import com.fittogether.server.dm.domain.dto.ChattingDto;
import com.fittogether.server.dm.domain.dto.RequestDto;
import com.fittogether.server.dm.domain.dto.RequestForm;
import com.fittogether.server.dm.domain.entity.ChatRoom;
import com.fittogether.server.dm.domain.entity.Request;
import com.fittogether.server.dm.domain.repository.ChatRoomRepository;
import com.fittogether.server.dm.domain.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class MateService {
    private final RequestRepository requestRepository;
    private final ChatRoomRepository chatRoomRepository;
    // private final JwtProvider jwtProvider;


    // 운동 메이트 요청
    public RequestDto mateRequest(RequestForm requestForm) {

        Request request = Request.from(requestForm);

        requestRepository.save(request);


        return RequestDto.from(request);
    }


    //운동 메이트 수락
    public ChattingDto mateAccept(Long senderId,boolean is_matched ) {

        if(is_matched==false){
            return null;
        }

        Request request =requestRepository.findAllBySenderId(senderId);
        request.setAccepted(true);

        requestRepository.save(request);

        return null;
    }

    //



}
