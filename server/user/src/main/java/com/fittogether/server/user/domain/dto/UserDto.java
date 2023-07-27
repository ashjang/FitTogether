package com.fittogether.server.user.domain.dto;

import com.fittogether.server.user.domain.model.User;
import lombok.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {
    private Long userId;
    private String email;
    private String profilePicture;
    private String nickname;
    private String password;
    private boolean gender;
    private List<ExerciseType> exerciseChoice;
    private boolean publicInfo;
    private String introduction;
    private Double latitude;
    private Double longitude;
    private UserType userType;

    public static UserDto from(User user) {
        List<ExerciseType> list = null;
        if (user.getExerciseChoice() != null) {
            String[] exercises = user.getExerciseChoice().split(",");
            list = Arrays.stream(exercises)
                    .map(ExerciseType::valueOf)
                    .collect(Collectors.toList());
        }

        return UserDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .profilePicture(user.getProfilePicture())
                .nickname(user.getNickname())
                .gender(user.isGender())
                .exerciseChoice(list)
                .publicInfo(user.isPublicInfo())
                .introduction(user.getIntroduction())
                .latitude(user.getLatitude())
                .longitude(user.getLongitude())
                .userType(user.getUserType())
                .build();
    }
}
