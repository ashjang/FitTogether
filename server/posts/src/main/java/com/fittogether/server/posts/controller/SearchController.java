package com.fittogether.server.posts.controller;

import com.fittogether.server.posts.domain.dto.PostListDto;
import com.fittogether.server.posts.service.SearchService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts/search")
public class SearchController {

  private final SearchService searchService;

  /**
   * 전체 게시글 검색
   */
  @GetMapping
  public ResponseEntity<List<PostListDto>> allPost() {
    return ResponseEntity.ok(
        searchService.allPost());
  }

  /**
   * 내 게시글 검색
   */
  @GetMapping("/my")
  public ResponseEntity<List<PostListDto>> myPost(
      @RequestHeader(name = "X-AUTH-TOKEN") String token) {
    return ResponseEntity.ok(
        searchService.myPost(token));
  }

  /**
   * 운동종목 별 검색
   */
  @GetMapping("/category")
  public ResponseEntity<List<PostListDto>> getPostByCategory(@RequestParam("category") String keyword) {
    return ResponseEntity.ok(
        searchService.getPostByCategory(keyword));
  }

  /**
   * 해시태그 별 검색
   */
  @GetMapping("/hashtag")
  public ResponseEntity<List<PostListDto>> getPostByHashtag(@RequestParam("hashtag") String keyword) {
    return ResponseEntity.ok(
        searchService.getPostByHashtag(keyword));
  }

  /**
   * 제목 별 검색
   */
  @GetMapping("/title")
  public ResponseEntity<List<PostListDto>> getPostByTitle(@RequestParam("title") String title) {
    return ResponseEntity.ok(
        searchService.getPostByTitle(title));
  }
}