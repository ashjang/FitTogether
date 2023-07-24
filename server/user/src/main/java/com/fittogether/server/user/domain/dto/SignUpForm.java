package com.fittogether.server.user.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpForm {
    private String nickname;
    private String password;
    private String email;
    private boolean gender;
    private boolean publicInfo;
}
