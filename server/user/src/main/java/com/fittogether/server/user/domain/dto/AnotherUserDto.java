package com.fittogether.server.user.domain.dto;

import com.fittogether.server.user.domain.model.User;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class AnotherUserDto {
    private Long userId;
    private String nickname;
    private boolean gender;
    private String introduction;
    private List<ExerciseType> exerciseChoice;
    private Double latitude;
    private Double longitude;

    public static AnotherUserDto from(User user) {
        return AnotherUserDto.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .gender(user.isGender())
                .introduction(user.getIntroduction())
                .exerciseChoice(user.getExerciseChoice())
                .latitude(user.getLatitude())
                .longitude(user.getLongitude())
                .build();
    }
}
