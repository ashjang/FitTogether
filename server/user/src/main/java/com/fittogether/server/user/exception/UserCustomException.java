package com.fittogether.server.user.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class UserCustomException extends RuntimeException {
    private final UserErrorCode errorCode;
    private final int status;
    private static final ObjectMapper mapper = new ObjectMapper();

    public UserCustomException(UserErrorCode errorCode) {
        super(errorCode.getDetail());
        this.errorCode = errorCode;
        this.status = errorCode.getHttpStatus().value();
    }

    @AllArgsConstructor
    @Builder
    @NoArgsConstructor
    @Getter
    public static class CustomExceptionResponse {
        private int status;
        private String code;
        private String message;
    }
}
