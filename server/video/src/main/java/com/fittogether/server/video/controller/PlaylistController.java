package com.fittogether.server.video.controller;

import com.fittogether.server.video.domain.dto.PlaylistDto;
import com.fittogether.server.video.domain.form.PlaylistForm;
import com.fittogether.server.video.service.PlaylistService;
import java.nio.charset.Charset;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
  public ResponseEntity createPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @RequestBody PlaylistForm form) {

    return playlistService.createPlaylist(token, form) == null ?
        ResponseEntity.badRequest().body("생성 실패했습니다.") :
        ResponseEntity.status(HttpStatus.CREATED).body("생성이 완료되었습니다.");
  }

  @GetMapping
  public ResponseEntity<List<PlaylistDto>> readPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token) {

    return ResponseEntity.ok(playlistService.readPlaylist(token).stream()
        .map(PlaylistDto::from).collect(Collectors.toList()));
  }

}