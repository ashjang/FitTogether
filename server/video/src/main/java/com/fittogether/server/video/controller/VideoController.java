package com.fittogether.server.video.controller;

import com.fittogether.server.video.domain.dto.VideoDto;
import com.fittogether.server.video.service.CrawlingService;
import com.fittogether.server.video.service.VideoService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/video")
public class VideoController {

  private final VideoService videoService;
  private final CrawlingService crawlingService;

  @GetMapping("/{keyword}")
  public ResponseEntity<List<VideoDto>> readYoutubeVideo(
      @PathVariable(name = "keyword") String keyword
  ) {

    return ResponseEntity.ok(videoService.getVideoByKeyword(keyword).stream()
        .map(VideoDto::from)
        .collect(Collectors.toList()));
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
