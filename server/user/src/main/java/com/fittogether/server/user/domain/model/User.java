package com.fittogether.server.user.domain.model;

import com.fittogether.server.user.domain.dto.ExerciseType;
import com.fittogether.server.user.domain.dto.SignUpForm;
import com.fittogether.server.user.domain.dto.UserType;
import lombok.*;
import org.hibernate.envers.AuditOverride;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@AuditOverride(forClass = BaseEntity.class)
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true)
    private String email;
    private String profilePicture;

    @Column(unique = true)
    private String nickname;

    private String password;
    private boolean gender;

    @ElementCollection
    @CollectionTable(name = "exercise", joinColumns = @JoinColumn(name = "user_id"))
    private List<ExerciseType> exerciseChoice;

    private boolean publicInfo;
    private String introduction;
    private Double latitude;
    private Double longitude;
    private UserType userType;

    public static User from(SignUpForm form) {
        return User.builder()
                .nickname(form.getNickname())
                .password(form.getPassword())
                .email(form.getEmail())
                .gender(form.isGender())
                .publicInfo(form.isPublicInfo())
                .userType(UserType.FITTOGETHER)
                .build();
    }
}
