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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

  private final PostService postService;
  private final LikeService likeService;

  @PostMapping
  public ResponseEntity<PostDto> createPost(@RequestHeader(name = "X-AUTH-TOKEN") String token,
      @RequestBody PostForm postForm) {

    return ResponseEntity.ok(PostDto.from(
        postService.createPost(token, postForm)));
  }

  @GetMapping("/{postId}")
  public ResponseEntity<PostInfo> clickPost(@PathVariable Long postId) {

    return ResponseEntity.ok(
        postService.clickPostById(postId));
  }

  @PutMapping("/{postId}")
  public ResponseEntity<PostDto> updatePost(@RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable Long postId,
      @RequestBody PostForm postForm) {
    return ResponseEntity.ok(PostDto.from(
        postService.updatePost(token, postId, postForm)));
  }

  @DeleteMapping("/{postId}")
  public ResponseEntity<?> deletePost(@RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable Long postId) {
    postService.deletePost(token, postId);

    return ResponseEntity.ok().body("게시글 삭제 완료");
  }


  @PostMapping("/{postId}/like")
  public ResponseEntity<LikeDto> likePost(@RequestHeader(name = "X-AUTH-TOKEN") String token,
      @PathVariable Long postId) {
    return ResponseEntity.ok(LikeDto.from(
        likeService.likePost(token, postId)));
  }


  @PostMapping("/upload")
  public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {

    return ResponseEntity.ok(
        postService.uploadImage(file));
  }
}
