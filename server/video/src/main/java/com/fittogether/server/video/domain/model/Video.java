package com.fittogether.server.video.domain.model;

import com.fittogether.server.video.domain.form.VideoForm;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.AuditOverride;

@Table(name = "video")
@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@AuditOverride(forClass = BaseEntity.class)
public class Video extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long videoId;

  @Column(unique = true)
  private String url;

  private String title;

  private String thumbnail;

  private String keyword;

  public static Video from(VideoForm form){
    return Video.builder()
        .url(form.getVideoUrl())
        .title(form.getTitle())
        .thumbnail(form.getThumbnail())
        .keyword(form.getKeyword())
        .build();
  }

}
