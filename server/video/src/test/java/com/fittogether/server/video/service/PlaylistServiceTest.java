package com.fittogether.server.video.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.fittogether.server.FitTogetherApplication;
import com.fittogether.server.video.domain.form.PlaylistForm;
import com.fittogether.server.video.domain.model.Playlist;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = FitTogetherApplication.class)
class PlaylistServiceTest {

  @Autowired
  private PlaylistService playlistService;

  @Test
  void CREATE_PLAYLIST() {
    // given
    PlaylistForm form = PlaylistForm.builder()
        .playlistName("테스트").build();

    Long userId = 1L;

    // when
    Playlist p = playlistService.createPlaylist(userId, form);

    assertNotNull(p.getCreatedAt());
    assertEquals(p.getPlaylistName(), "테스트");
    assertEquals(p.getUserId(), 1L);
  }

}