package com.fittogether.server.video.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum VideoErrorCode {
  SAME_PLAYLIST_NAME(HttpStatus.BAD_REQUEST, "같은 이름의 플레이리스트가 존재합니다.")

  ;

  private final HttpStatus httpStatus;
  private final String detail;

}