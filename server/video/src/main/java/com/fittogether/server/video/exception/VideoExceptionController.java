package com.fittogether.server.video.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class VideoExceptionController {
  @ExceptionHandler({
      VideoCustomException.class
  })
  public ResponseEntity<ExceptionResponse> customRequestException(final VideoCustomException c){
    log.warn("api Exception : {}", c.getErrorCode());
    return ResponseEntity.badRequest().body(new ExceptionResponse(c.getMessage(), c.getErrorCode()));
  }

  @Getter
  @ToString
  @AllArgsConstructor
  public static class ExceptionResponse{
    private String message;
    private VideoErrorCode errorCode;
  }

}
