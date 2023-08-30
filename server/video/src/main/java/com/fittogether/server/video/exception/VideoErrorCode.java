package com.fittogether.server.video.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum VideoErrorCode {
  ALREADY_EXIST_PLAYLIST_NAME(HttpStatus.BAD_REQUEST, "같은 이름의 플레이리스트가 존재합니다."),
  SAME_PLAYLIST_NAME(HttpStatus.BAD_REQUEST, "이전과 같은 이름입니다."),
  NOT_FOUND_PLAYLIST(HttpStatus.BAD_REQUEST, "해당 이름의 플레이리스트가 존재하지 않습니다."),
  ALREADY_EXIST_VIDEO(HttpStatus.BAD_REQUEST, "같은 영상이 존재합니다."),
  NOT_FOUND_VIDEO(HttpStatus.BAD_REQUEST, "해당 영상은 존재하지 않습니다."),
  NOT_FOUND_KEYWORD(HttpStatus.BAD_REQUEST, "해당 키워드의 영상은 존재하지 않습니다.")

  ;

  private final HttpStatus httpStatus;
  private final String detail;

}