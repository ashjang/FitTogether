package com.fittogether.server.posts.controller;

import com.fittogether.server.posts.domain.dto.PostDto;
import com.fittogether.server.posts.domain.dto.PostForm;
import com.fittogether.server.posts.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PostController {

  private final PostService postService;

  @PostMapping("/posts")
  public ResponseEntity<PostDto> createPost(@RequestHeader(name = "Authorization") String token,
      @RequestBody PostForm postForm) {

    return ResponseEntity.ok(PostDto.from(
        postService.createPost(token, postForm)));

  }

  @PutMapping("/posts/{postId}")
  public ResponseEntity<PostDto> updatePost(@RequestHeader(name = "Authorization") String token,
      @PathVariable Long postId,
      @RequestBody PostForm postForm) {
    return ResponseEntity.ok(PostDto.from(
        postService.updatePost(token, postId, postForm)));
  }
  
  @DeleteMapping("/posts/{postId}")
  public ResponseEntity<?> deletePost(@RequestHeader(name = "Authorization") String token,
      @PathVariable Long postId) {
    postService.deletePost(token, postId);

    return ResponseEntity.ok().body("게시글 삭제 완료");
  }
}
