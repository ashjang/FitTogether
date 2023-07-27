package com.fittogether.server.user.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserForm {
    private String password;
    private String profilePicture;
    private List<ExerciseType> exerciseChoice;
    private boolean gender;
    private String introduction;
    private boolean publicInfo;
}
