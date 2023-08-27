package com.fittogether.server.dm.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class DmExceptionController {
    @ExceptionHandler({DmCustomException.class})
    public ResponseEntity<DmCustomException.ExceptionResponse> exceptionHandler(
            HttpServletRequest request, DmCustomException e) {
        return ResponseEntity
                .status(e.getStatus())
                .body(
                        DmCustomException.ExceptionResponse.builder()
                                .status(e.getStatus())
                                .code(e.getDmErrorCode().name())
                                .message(e.getMessage())
                                .build()
                );
    }
}
