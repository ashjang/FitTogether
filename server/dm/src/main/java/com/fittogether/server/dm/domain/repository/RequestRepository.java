package com.fittogether.server.dm.domain.repository;

import com.fittogether.server.dm.domain.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request,Long> {

   // 수락 유저용
     Request findAllBySenderNicknameAndReceiverNickname(String senderNickname,String receiverNickname);
    List<Request> findAllBySenderNicknameAndIsAccepted(String senderNickname,  boolean isAccepted);
    List<Request> findAllByReceiverNicknameAndIsAccepted(String senderNickname,  boolean isAccepted);
    boolean existsBySenderNicknameAndReceiverNickname(String senderNickname,String receiverNickname);


}
