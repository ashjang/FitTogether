package com.fittogether.server.posts.domain.model;

import com.fittogether.server.posts.type.Category;
import com.fittogether.server.user.domain.model.User;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  private String title;
  private String description;
  private String image;

  @Enumerated(value = EnumType.STRING)
  private Category category;
  private Long likes;
  private Long watched;
  private boolean accessLevel;

  private LocalDateTime createdAt;
  private LocalDateTime modifiedAt;

}