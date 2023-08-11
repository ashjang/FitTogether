package com.fittogether.server.dm.domain.repository;

import com.fittogether.server.dm.domain.entity.Request;
import com.fittogether.server.user.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request,Long> {

   // 수락 유저용
     Request findAllBySenderIdAndReceiverId(User senderId,User receiverId);
     List<Request> findAllBySenderId(User senderId);


}
