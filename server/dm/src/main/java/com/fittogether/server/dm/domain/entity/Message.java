package com.fittogether.server.dm.domain.entity;

import com.fittogether.server.user.domain.model.User;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Message {

    @Id
    Long messageId;
    @ManyToOne
    @JoinColumn(name = "chatRoom_id")
    ChatRoom chatRoomId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    User senderId;

    String senderNickname;
    String contents;
    LocalDateTime sendDt;



}
