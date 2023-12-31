package com.fittogether.server.video.domain.model;

import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.video.domain.form.PlaylistForm;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.AuditOverride;

@Table(name = "playlist")
@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@AuditOverride(forClass = BaseEntity.class)
public class Playlist extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long playlistId;

  private String playlistName;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @OneToMany(mappedBy = "playlist")
  private List<PlaylistVideo> playlistVideos = new ArrayList<>();

  public static Playlist of(User user, PlaylistForm form) {
    return Playlist.builder()
        .playlistName(form.getPlaylistName())
        .user(user)
        .build();
  }

//  public void addVideo(PlaylistVideo playlistVideo){
//    playlistVideos.add(playlistVideo);
//  }

}