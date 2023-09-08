package com.fittogether.server.dm.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class DmCustomException extends RuntimeException {
    private final DmErrorCode dmErrorCode;

    private final int status;

    private static final ObjectMapper mapper = new ObjectMapper();

    public DmCustomException(DmErrorCode dmErrorCode) {
        super(dmErrorCode.getDetail());
        this.dmErrorCode = dmErrorCode;
        this.status = dmErrorCode.getHttpStatus().value();
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ExceptionResponse {
        private int status;
        private String code;
        private String message;

    }


}
