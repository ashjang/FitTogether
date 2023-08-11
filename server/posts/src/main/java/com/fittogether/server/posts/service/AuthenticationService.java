package com.fittogether.server.posts.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.exception.ErrorCode;
import com.fittogether.server.posts.exception.PostException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final JwtProvider provider;

  /**
   * 토큰 및 유저 검증
   */
  void validate(String token, Post post) {
    if (!provider.validateToken(token)) {
      throw new RuntimeException("Invalid or expired token.");
    }

    UserVo userVo = provider.getUserVo(token);

    if (!post.getUser().getUserId().equals(userVo.getUserId())) {
      throw new PostException(ErrorCode.NO_PERMISSION_TO_VIEW_POST);
    }
  }

}
