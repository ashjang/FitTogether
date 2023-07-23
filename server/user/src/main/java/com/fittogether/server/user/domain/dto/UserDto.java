package com.fittogether.server.user.domain.dto;

import com.fittogether.server.user.domain.model.User;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {
    private Long userId;
    private String email;
    private String profile_picture;
    private String nickname;
    private String password;
    private boolean gender;
    private String exercise_choice;
    private boolean public_info;
    private String introduction;
    private Double latitude;
    private Double longitude;

    public static UserDto from(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .profile_picture(user.getProfile_picture())
                .nickname(user.getNickname())
                .gender(user.isGender())
                .exercise_choice(user.getExercise_choice())
                .public_info(user.isPublic_info())
                .introduction(user.getIntroduction())
                .latitude(user.getLatitude())
                .longitude(user.getLongitude())
                .build();
    }
}
