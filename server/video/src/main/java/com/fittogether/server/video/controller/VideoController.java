package com.fittogether.server.video.controller;

import com.fittogether.server.video.domain.dto.PlaylistVideoDto;
import com.fittogether.server.video.domain.dto.VideoDto;
import com.fittogether.server.video.domain.form.VideoForm;
import com.fittogether.server.video.service.CrawlingService;
import com.fittogether.server.video.service.VideoService;
import com.google.api.services.youtube.model.SearchResult;
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
public class VideoController {

  private final VideoService videoService;
  private final CrawlingService crawlingService;

  @GetMapping("/playlist/{name}")
  public ResponseEntity<List<PlaylistVideoDto>> readVideoInPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable(name = "name") String targetName
  ) {

    // PlaylistVideoDto(playlist 이름과 video 이름) 반환
    return ResponseEntity.ok(videoService.getVideoInPlaylist(token, targetName).stream()
        .map(PlaylistVideoDto::from).collect(Collectors.toList()));
  }

  @GetMapping("/video/{keyword}")
  public ResponseEntity<List<VideoDto>> readYoutubeVideo(
      @PathVariable(name = "keyword") String keyword
  ) {

    return ResponseEntity.ok(videoService.getVideo(keyword).stream()
        .map(VideoDto::from)
        .collect(Collectors.toList()));
  }

  @PostMapping("/playlist/{name}")
  public ResponseEntity<?> addVideoToPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable(name = "name") String targetName,
      @RequestBody String videoTitle) {

    return ResponseEntity.status(HttpStatus.CREATED).body(
        PlaylistVideoDto.from(videoService.addVideoToPlaylist(token, targetName, videoTitle)));
  }

  @DeleteMapping("/playlist/{name}/video/{videoId}")
  public ResponseEntity deleteVideoInPlaylist(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable(name = "name") String targetName,
      @PathVariable(name = "videoId") Long videoId
  ) {

    videoService.deleteVideoInPlaylist(token, targetName, videoId);
    return ResponseEntity.ok().body("재생목록에서 삭제되었습니다.");
  }


  @GetMapping("/crawl/running")
  public void crawlRunningVideo() {
    crawlingService.saveRunningVideo();
  }

  @GetMapping("/crawl/hiking")
  public void crawlHikingVideo() {
    crawlingService.saveHikingVideo();
  }

  @GetMapping("/crawl/health")
  public void crawlHealthVideo() {
    crawlingService.saveHealthVideo();
  }

}
