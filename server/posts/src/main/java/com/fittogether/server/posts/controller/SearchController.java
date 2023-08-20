package com.fittogether.server.posts.controller;

import com.fittogether.server.posts.domain.dto.PostResponse;
import com.fittogether.server.posts.service.SearchService;
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
  public ResponseEntity<PostResponse> allPost(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    return ResponseEntity.ok(
        searchService.allPost(page, size));
  }

  /**
   * 내 게시글 검색
   */
  @GetMapping("/my")
  public ResponseEntity<PostResponse> myPost(
      @RequestHeader(name = "X-AUTH-TOKEN") String token,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    return ResponseEntity.ok(
        searchService.myPost(token, page, size));
  }

  /**
   * 운동종목 별 검색
   */
  @GetMapping("/category")
  public ResponseEntity<PostResponse> getPostByCategory(
      @RequestParam("category") String keyword,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    return ResponseEntity.ok(
        searchService.getPostByCategory(keyword, page, size));
  }

  /**
   * 해시태그 별 검색
   */
  @GetMapping("/hashtag")
  public ResponseEntity<PostResponse> getPostByHashtag(
      @RequestParam("hashtag") String keyword,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    return ResponseEntity.ok(
        searchService.getPostByHashtag(keyword, page, size));
  }

  /**
   * 제목 별 검색
   */
  @GetMapping("/title")
  public ResponseEntity<PostResponse> getPostByTitle(
      @RequestParam("title") String title,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    return ResponseEntity.ok(
        searchService.getPostByTitle(title, page, size));
  }
}