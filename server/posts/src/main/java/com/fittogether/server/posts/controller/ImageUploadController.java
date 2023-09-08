package com.fittogether.server.posts.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class ImageUploadController {

  private final AmazonS3Client amazonS3Client;

  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  @Value("${cloud.aws.region.static}")
  private String region;

  /**
   * 이미지 업로드
   */
  @PostMapping("/upload")
  public ResponseEntity<List<String>> uploadImage(@RequestParam("image") List<MultipartFile> images) {
    List<String> imageUrls = new ArrayList<>();

    try {
      for (MultipartFile image : images) {
        String fileName = image.getOriginalFilename();
        String fileUrl = "https://" + bucket + ".s3." + region +".amazonaws.com/" + fileName;

        ObjectMetadata metadata = new ObjectMetadata();

        metadata.setContentType(image.getContentType());
        metadata.setContentLength(image.getSize());
        amazonS3Client.putObject(bucket, fileName, image.getInputStream(), metadata);

        imageUrls.add(fileUrl);
      }

      return ResponseEntity.ok(imageUrls);

    } catch (IOException e) {
      e.printStackTrace();

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
