package com.fittogether.server.posts.domain.model;

import com.fittogether.server.user.domain.model.User;
import java.time.LocalDateTime;
import javax.persistence.Entity;
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
public class ChildReply {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String comment;
  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;


  @ManyToOne
  @JoinColumn(name = "reply_id")
  private Reply reply;
}
