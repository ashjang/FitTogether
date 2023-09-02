package com.fittogether.server.video.controller;

import com.fittogether.server.video.domain.dto.CursorResult;
import com.fittogether.server.video.domain.dto.PlaylistDto;
import com.fittogether.server.video.domain.dto.PlaylistVideoDto;
import com.fittogether.server.video.domain.form.PlaylistForm;
import com.fittogether.server.video.domain.form.VideoForm;
import com.fittogether.server.video.service.PlaylistService;
import com.fittogether.server.video.service.VideoService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/playlist")
public class PlaylistController {

  private final PlaylistService playlistService;
  private final VideoService videoService;

  @GetMapping("/{name}")
  public ResponseEntity<CursorResult<PlaylistVideoDto>> readVideoInPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable(name = "name") String targetName,
      @RequestParam(value = "cursorId") Long cursorId,
      @RequestParam(value = "size", required = false, defaultValue = "5") int size) {
    if(cursorId == -1){
      cursorId = null;
    }

    return ResponseEntity.ok(videoService.getFromPlaylist(token, targetName, cursorId, PageRequest.of(0, size)));
  }

  @PostMapping("/{name}")
  public ResponseEntity<?> addVideoToPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable(name = "name") String targetName,
      @RequestBody VideoForm form) {

    return ResponseEntity.status(HttpStatus.CREATED).body(
        PlaylistVideoDto.from(videoService.addVideoToPlaylist(token, targetName, form)));
  }

  @DeleteMapping("/{name}/video/{videoId}")
  public ResponseEntity deleteVideoInPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable(name = "name") String targetName,
      @PathVariable(name = "videoId") String videoId
  ) {

    videoService.deleteVideoInPlaylist(token, targetName, videoId);
    return ResponseEntity.ok().body("재생목록에서 삭제되었습니다.");
  }

  /**
   Playlist 생성, 목록 읽기, 수정, 삭제
   */
  @GetMapping
  public ResponseEntity<List<PlaylistDto>> readPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token) {

    return ResponseEntity.ok(playlistService.readPlaylist(token).stream()
        .map(PlaylistDto::from).collect(Collectors.toList()));
  }

  @PostMapping
  public ResponseEntity<PlaylistDto> createPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @RequestBody PlaylistForm form) {

    return ResponseEntity.status(HttpStatus.CREATED).body(
        PlaylistDto.from(playlistService.createPlaylist(token, form)));
  }

  @PutMapping("/{name}")
  public ResponseEntity<PlaylistDto> updatePlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @RequestBody PlaylistForm form,
      @PathVariable(name = "name") String targetName) {

    return ResponseEntity.ok(
        PlaylistDto.from(playlistService.updatePlaylist(token, targetName, form)));
  }

  @DeleteMapping("/{name}")
  public ResponseEntity deletePlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable(name = "name") String targetName) {

    playlistService.deletePlaylist(token, targetName);
    return ResponseEntity.ok().body("삭제가 완료되었습니다.");
  }
}