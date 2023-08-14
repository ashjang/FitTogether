package com.fittogether.server.posts.controller;

import com.fittogether.server.posts.domain.dto.LikeDto;
import com.fittogether.server.posts.domain.dto.PostDto;
import com.fittogether.server.posts.domain.dto.PostForm;
import com.fittogether.server.posts.domain.dto.PostInfo;
import com.fittogether.server.posts.service.LikeService;
import com.fittogether.server.posts.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

  private final PostService postService;
  private final LikeService likeService;

  /**
   * 게시글 작성
   */
  @PostMapping
  public ResponseEntity<PostDto> createPost(@RequestHeader(name = "X-AUTH-TOKEN") String token,
      @RequestBody PostForm postForm) {

    return ResponseEntity.ok(PostDto.from(
        postService.createPost(token, postForm)));

  }

  /**
   * 게시글 보기
   */
  @GetMapping("/{postId}")
  public ResponseEntity<PostInfo> clickPost(@RequestHeader(name = "X-AUTH-TOKEN", required = false) String token,
                                            @PathVariable Long postId) {

    return ResponseEntity.ok(
        postService.clickPostById(token, postId));
  }

  /**
   * 게시글 수정
   */
  @PutMapping("/{postId}")
  public ResponseEntity<PostDto> updatePost(@RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable Long postId,
      @RequestBody PostForm postForm) {
    return ResponseEntity.ok(PostDto.from(
        postService.updatePost(token, postId, postForm)));
  }

  /**
   * 게시글 삭제
   */
  @DeleteMapping("/{postId}")
  public ResponseEntity<?> deletePost(@RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable Long postId) {
    postService.deletePost(token, postId);

    return ResponseEntity.ok().body("게시글 삭제 완료");
  }

  /**
   * 게시글 좋아요
   */
  @PostMapping("/{postId}/like")
  public ResponseEntity<LikeDto> likePost(@RequestHeader(name = "X-AUTH-TOKEN") String token,
                                          @PathVariable Long postId) {
    return ResponseEntity.ok(LikeDto.from(
        likeService.likePost(token, postId), likeService.getLikeCountByDB(postId)));
  }
}