package com.fittogether.server.video.controller;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.video.domain.dto.PlaylistDto;
import com.fittogether.server.video.domain.form.PlaylistForm;
import com.fittogether.server.video.domain.model.Playlist;
import com.fittogether.server.video.service.PlaylistService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
  public ResponseEntity<PlaylistDto> createPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @RequestBody PlaylistForm form) {

    return ResponseEntity.ok(PlaylistDto.from(playlistService.createPlaylist(token, form)));
  }

  @GetMapping
  public ResponseEntity<List<PlaylistDto>> readPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token) {

    return ResponseEntity.ok(playlistService.readPlaylist(token).stream()
        .map(PlaylistDto::from).collect(Collectors.toList()));
  }

}