package com.fittogether.server.video.exception;

import lombok.Getter;

@Getter
public class VideoCustomException extends RuntimeException{
  private final VideoErrorCode errorCode;

  public VideoCustomException(VideoErrorCode errorCode){
    super(errorCode.getDetail());
    this.errorCode = errorCode;
  }

}
