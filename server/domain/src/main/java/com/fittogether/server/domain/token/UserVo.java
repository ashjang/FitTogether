package com.fittogether.server.domain.token;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserVo {
    private Long userId;
    private String nickname;
}
