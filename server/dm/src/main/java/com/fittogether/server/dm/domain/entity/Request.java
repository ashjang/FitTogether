package com.fittogether.server.dm.domain.entity;


import com.fittogether.server.user.domain.model.User;
import lombok.*;

import javax.persistence.*;

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


   @ManyToOne
    @JoinColumn( name = "sender_id")
    private User senderId;
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiverId;

    private String senderNickname;
    private String receiverNickname;
    private boolean isAccepted;



}
