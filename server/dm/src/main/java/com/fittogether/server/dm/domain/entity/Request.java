package com.fittogether.server.dm.domain.entity;

import com.fittogether.server.dm.domain.dto.RequestForm;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    private Long senderId;
    private Long receiverId;

    private boolean isAccepted = false;


    public static Request from(RequestForm requestForm){

               Request request = Request.builder()
                .senderId(requestForm.getSenderId())
                .receiverId(requestForm.getReceiverId())
                .build();


        return request;

    }
}
