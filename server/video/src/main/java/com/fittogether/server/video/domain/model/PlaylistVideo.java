package com.fittogether.server.video.domain.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.AuditOverride;

@Table(name = "PLAYLIST_VIDEO")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@AuditOverride(forClass = BaseEntity.class)
public class PlaylistVideo extends BaseEntity{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "playlist_video_id")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "playlist_id")
  private Playlist playlist;

  @ManyToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "video_id")
  private Video video;

  public static PlaylistVideo of(Playlist playlist, Video video){
    return PlaylistVideo.builder()
        .playlist(playlist)
        .video(video)
        .build();
  }
}
