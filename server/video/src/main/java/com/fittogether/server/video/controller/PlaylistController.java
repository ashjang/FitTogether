package com.fittogether.server.video.controller;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.video.domain.form.PlaylistForm;
import com.fittogether.server.video.domain.model.Playlist;
import com.fittogether.server.video.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/playlist")
public class PlaylistController {

  private final PlaylistService playlistService;

  @PostMapping
  public ResponseEntity<Playlist> createPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @RequestBody PlaylistForm form) {

    return ResponseEntity.ok(playlistService.createPlaylist(token, form));
  }

}