package com.fittogether.server.user.domain.repository;

import com.fittogether.server.user.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByNickname(String nickname);

    boolean existsByEmail(String email);

    Optional<User> findByNickname(String nickname);
}
