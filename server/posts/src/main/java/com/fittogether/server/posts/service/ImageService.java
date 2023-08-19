package com.fittogether.server.posts.service;

import com.fittogether.server.posts.domain.model.Image;
import com.fittogether.server.posts.domain.model.Post;
import com.fittogether.server.posts.domain.repository.ImageRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ImageService {

  private final ImageRepository imageRepository;


  /**
   * 이미지 DB 저장
   */
  @Transactional
  public void addImageForDB(List<String> images, Post post) {
    List<Image> imageList = images.stream()
        .map(image -> {
          Image imageUrl = imageRepository.findByImageUrl(image);

          if (imageUrl != null) {
            return imageUrl;
          } else {
            return Image.builder()
                .post(post)
                .imageUrl(image)
                .build();
          }
        })
        .collect(Collectors.toList());

    imageRepository.saveAll(imageList);
  }

}
