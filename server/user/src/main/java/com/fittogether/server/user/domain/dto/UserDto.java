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
    private String profilePicture;
    private String nickname;
    private String password;
    private boolean gender;
    private String exerciseChoice;
    private boolean publicInfo;
    private String introduction;
    private Double latitude;
    private Double longitude;
    private UserType userType;

    public static UserDto from(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .profilePicture(user.getProfilePicture())
                .nickname(user.getNickname())
                .gender(user.isGender())
                .exerciseChoice(user.getExerciseChoice())
                .publicInfo(user.isPublicInfo())
                .introduction(user.getIntroduction())
                .latitude(user.getLatitude())
                .longitude(user.getLongitude())
                .userType(user.getUserType())
                .build();
    }
}
