package com.fittogether.server.dm.service;

import com.fittogether.server.dm.domain.dto.RequestDto;
import com.fittogether.server.dm.domain.dto.RequestForm;
import com.fittogether.server.dm.domain.entity.Request;
import com.fittogether.server.dm.domain.repository.ChatRoomRepository;
import com.fittogether.server.dm.domain.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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


}
