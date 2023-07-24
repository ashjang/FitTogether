package com.fittogether.server.user.domain.model;

import com.fittogether.server.user.domain.dto.SignUpForm;
import lombok.*;
import org.hibernate.envers.AuditOverride;

import javax.persistence.*;

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
    @Column(columnDefinition = "TEXT")
    private String exerciseChoice;
    private boolean publicInfo;
    private String introduction;
    private Double latitude;
    private Double longitude;

    public static User from(SignUpForm form) {
        return User.builder()
                .nickname(form.getNickname())
                .password(form.getPassword())
                .email(form.getEmail())
                .gender(form.isGender())
                .publicInfo(form.isPublicInfo())
                .build();
    }
}
