package com.fittogether.server.dm.service;

import com.fittogether.server.dm.domain.dto.ChatRoomDto;
import com.fittogether.server.dm.domain.dto.ChattingDto;
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
    public ChattingDto mateRequest(RequestForm requestForm ) {

        Request request = Request.from(requestForm);
        ChatRoom chatRoom=new ChatRoom();

        chatRoomRepository.save(chatRoom);
        requestRepository.save(request);

        return ChattingDto.requestFrom(request,chatRoom);
    }

//    public ChattingDto mateAccept(
//            String token,Long roomId, boolean is_matched
//    ){
//            Request request ;
//            request.setAccepted(true);
//    }


}
