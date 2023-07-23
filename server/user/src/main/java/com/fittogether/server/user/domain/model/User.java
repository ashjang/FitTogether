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
    private String profile_picture;

    @Column(unique = true)
    private String nickname;

    private String password;
    private boolean gender;
    @Column(columnDefinition = "TEXT")
    private String exercise_choice;
    private boolean public_info;
    private String introduction;
    private Double latitude;
    private Double longitude;

    public static User from(SignUpForm form) {
        return User.builder()
                .nickname(form.getNickname())
                .password(form.getPassword())
                .email(form.getEmail())
                .gender(form.isGender())
                .public_info(form.isPublic_info())
                .build();
    }
}
