package com.fittogether.server.dm.domain.entity;

import com.fittogether.server.user.domain.model.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long chatRoomId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    User senderId;
    @ManyToOne
    @JoinColumn(name ="receiver_id")
    User receiverId;
    String senderNickname;
    String receiverNickname;
    LocalDateTime chatRoomDt;


}
