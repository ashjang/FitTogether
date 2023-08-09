package com.fittogether.server.video.controller;

import com.fittogether.server.video.domain.dto.PlaylistVideoDto;
import com.fittogether.server.video.domain.form.VideoForm;
import com.fittogether.server.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/playlist/video")
public class VideoController {

  private final VideoService videoService;

  @PostMapping("/{name}")
  public ResponseEntity<?> addVideo(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable(name = "name") String targetName,
      @RequestBody VideoForm form){

    return ResponseEntity.status(HttpStatus.CREATED).body(
        PlaylistVideoDto.from(videoService.addVideoToPlaylist(token, targetName, form)));
  }

}
