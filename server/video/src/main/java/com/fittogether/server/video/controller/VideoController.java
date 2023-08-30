package com.fittogether.server.video.controller;

import com.fittogether.server.video.domain.dto.CursorResult;
import com.fittogether.server.video.domain.dto.VideoDto;
import com.fittogether.server.video.service.CrawlingService;
import com.fittogether.server.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/video")
public class VideoController {

  private final VideoService videoService;
  private final CrawlingService crawlingService;

  @GetMapping("/{keyword}")
  public ResponseEntity<CursorResult<VideoDto>> getVideos(
      @PathVariable(name = "keyword") String keyword,
      @RequestParam(value = "cursorId", required = false) Long cursorId,
      @RequestParam(value = "size", required = false, defaultValue = "5") int size) {

    return ResponseEntity.ok(videoService.get(keyword, cursorId, PageRequest.of(0, size)));
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
