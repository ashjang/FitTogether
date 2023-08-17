package com.fittogether.server.video.controller;

import com.fittogether.server.video.domain.dto.PlaylistVideoDto;
import com.fittogether.server.video.domain.form.VideoForm;
import com.fittogether.server.video.service.VideoService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/playlist")
public class VideoController {

  private final VideoService videoService;

  @GetMapping("/{name}")
  public ResponseEntity<List<PlaylistVideoDto>> readVideoInPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable(name = "name") String targetName
  ) {

    // PlaylistVideoDto(playlist 이름과 video 이름) 반환
    return ResponseEntity.ok(videoService.getVideoInPlaylist(token, targetName).stream()
        .map(PlaylistVideoDto::from).collect(Collectors.toList()));
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
      @PathVariable(name = "videoId") Long videoId
  ) {

    videoService.deleteVideoInPlaylist(token, targetName, videoId);
    return ResponseEntity.ok().body("재생목록에서 삭제되었습니다.");
  }

}
