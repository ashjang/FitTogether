package com.fittogether.server.user.domain.dto;

import com.fittogether.server.user.domain.model.User;
import lombok.Builder;

import java.util.List;

@Builder
public class AnotherUserDto {
    private Long userId;
    private String nickname;
    private boolean gender;
    private String introduction;
    private List<ExerciseType> exerciseChoice;

    public static AnotherUserDto from(User user) {
        return AnotherUserDto.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .gender(user.isGender())
                .introduction(user.getIntroduction())
                .exerciseChoice(user.getExerciseChoice())
                .build();
    }
}
