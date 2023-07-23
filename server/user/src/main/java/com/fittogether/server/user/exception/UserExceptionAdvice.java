package com.fittogether.server.user.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class UserExceptionAdvice {
    @ExceptionHandler({
            UserCustomException.class
    })
    public ResponseEntity<UserCustomException.CustomExceptionResponse> exceptionHandler(HttpServletRequest req, UserCustomException exception) {
        return ResponseEntity
                .status(exception.getStatus())
                .body(
                        UserCustomException.CustomExceptionResponse.builder()
                                .code(exception.getErrorCode().name())
                                .message(exception.getMessage())
                                .build()
                );
    }
}
