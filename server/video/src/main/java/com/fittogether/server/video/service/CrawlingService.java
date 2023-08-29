package com.fittogether.server.video.service;

import com.fittogether.server.video.domain.model.Video;
import com.fittogether.server.video.domain.repository.VideoRepository;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.ResourceId;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import com.google.api.services.youtube.model.Thumbnail;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CrawlingService {

  private final VideoRepository videoRepository;

  @Value("${youtube-key}")
  private String youtube_api_key;

  private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
  private static final JsonFactory JSON_FACTORY = new JacksonFactory();
  private static final long NUMBER_OF_VIDEOS_RETURNED = 33;
  private java.util.List<SearchResult> searchResultList;
  private Map<String, String> resultMap;

  private static YouTube youTube;
  private static String nextPageToken = "";

  public List<SearchResult> searchKeyword(String keyword) {
    try {
      resultMap = new HashMap<>();
      youTube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, request -> {
      }).setApplicationName("youtube-search-sample").build();

      YouTube.Search.List search = youTube.search().list("id, snippet");
      search.setKey(youtube_api_key);
      if (keyword.equals("런닝") || keyword.equals("러닝")) {
        keyword = keyword + " -런닝맨";
      }
      search.setPageToken(nextPageToken);
      search.setQ(keyword);
      search.setMaxResults(NUMBER_OF_VIDEOS_RETURNED);
      search.setOrder("relevance");
      search.setType("video");
      search.setFields("items(id/kind, id/videoId, snippet/title, snippet/thumbnails/high/url)");
      SearchListResponse searchListResponse = search.execute();

      searchResultList = searchListResponse.getItems();

    } catch (GoogleJsonResponseException e) {
      System.err.println(
          "There was a service error: " + e.getDetails().getCode() +
              " : " + e.getDetails().getMessage()
      );
    } catch (IOException e) {
      System.err.println("There was an IO error: " + e.getCause() + " : " + e.getMessage());
    } catch (Throwable t) {
      t.printStackTrace();
    }

    return searchResultList;
  }

//  @Scheduled(cron = "0 0 17 * * 1,4")
  @Transactional
  public void saveRunningVideo() {
    Video video;
    for (SearchResult sr : searchKeyword("런닝")) {
      video = new Video();
      video.setTitle(sr.getSnippet().getTitle());
      video.setVideoId(sr.getId().getVideoId());
      video.setThumbnail(sr.getSnippet().getThumbnails().getHigh().getUrl());
      video.setKeyword("running");

      videoRepository.save(video);
    }
  }

//  @Scheduled(cron = "0 0 17 * * 2,5")
  @Transactional
  public void saveHikingVideo() {
    Video video;
    for (SearchResult sr : searchKeyword("등산")) {
      video = new Video();
      video.setTitle(sr.getSnippet().getTitle());
      video.setVideoId(sr.getId().getVideoId());
      video.setThumbnail(sr.getSnippet().getThumbnails().getHigh().getUrl());
      video.setKeyword("hiking");

      videoRepository.save(video);
    }
  }

//  @Scheduled(cron = "0 0 17 * * 3,6")
  @Transactional
  public void saveHealthVideo() {
    Video video;
    for (SearchResult sr : searchKeyword("헬스")) {
      video = new Video();
      video.setTitle(sr.getSnippet().getTitle());
      video.setVideoId(sr.getId().getVideoId());
      video.setThumbnail(sr.getSnippet().getThumbnails().getHigh().getUrl());
      video.setKeyword("health");

      videoRepository.save(video);
    }
  }

  private void prettyPrint(Iterator<SearchResult> iteratorSearchResults, String keyword) {
    System.out.println("\n=============================================");
    System.out.println(
        "     First " + NUMBER_OF_VIDEOS_RETURNED + " videos for search on \"" + keyword + "\".");
    System.out.println("\n=============================================");
    int count = 1;
    while (iteratorSearchResults.hasNext()) {
      System.out.println("===================" + count + "===================");
      SearchResult singleVideo = iteratorSearchResults.next();
      ResourceId rId = singleVideo.getId();

      if (rId.getKind().equals("youtube#video") && keyword.equals("런닝")) {
        Thumbnail thumbnail = (Thumbnail) singleVideo.getSnippet().getThumbnails().get("high");
        System.out.println(" Video Id  :" + rId.getVideoId());
        System.out.println(" Title     : " + singleVideo.getSnippet().getTitle());
        System.out.println(" Thumbnail : " + thumbnail.getUrl());
        System.out.println(
            " Video Url : " + "https://www.youtube.com/watch?v=_" + rId.getVideoId());
        System.out.println(" Next Page Token : " + nextPageToken);
        System.out.println("=============================================\n");
        resultMap.put(singleVideo.getSnippet().getTitle(), rId.getVideoId());
        count += 1;
      } else if (rId.getKind().equals("youtube#video") && keyword.equals("등산")) {
        Thumbnail thumbnail = (Thumbnail) singleVideo.getSnippet().getThumbnails().get("high");
        System.out.println(" Video Id  :" + rId.getVideoId());
        System.out.println(" Title     : " + singleVideo.getSnippet().getTitle());
        System.out.println(" Thumbnail : " + thumbnail.getUrl());
        System.out.println(
            " Video Url : " + "https://www.youtube.com/watch?v=_" + rId.getVideoId());
        System.out.println(" Next Page Token : " + nextPageToken);
        System.out.println("=============================================\n");
        resultMap.put(singleVideo.getSnippet().getTitle(), rId.getVideoId());
        count += 1;
      } else if (rId.getKind().equals("youtube#video") && keyword.equals("헬스")) {
        Thumbnail thumbnail = (Thumbnail) singleVideo.getSnippet().getThumbnails().get("high");
        System.out.println(" Video Id  :" + rId.getVideoId());
        System.out.println(" Title     : " + singleVideo.getSnippet().getTitle());
        System.out.println(" Thumbnail : " + thumbnail.getUrl());
        System.out.println(
            " Video Url : " + "https://www.youtube.com/watch?v=_" + rId.getVideoId());
        System.out.println(" Next Page Token : " + nextPageToken);
        System.out.println("=============================================\n");
        resultMap.put(singleVideo.getSnippet().getTitle(), rId.getVideoId());
        count += 1;
      }
    }
  }

}
