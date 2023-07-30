package com.fittogether.server.posts.exception;

import javax.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionAdvice {
    @ExceptionHandler({PostException.class})
    public ResponseEntity<PostException.CustomExceptionResponse> exceptionHandler(
            HttpServletRequest request, final PostException e) {
        return ResponseEntity
                .status(e.getStatus())
                .body(PostException.CustomExceptionResponse.builder()
                        .message(e.getMessage())
                        .code(e.getErrorCode().name())
                        .status(e.getStatus())
                        .build());
    }

}
