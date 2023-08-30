package com.fittogether.server.video.domain.dto;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class CursorResult<T> {
  private List<T> values;
  private Boolean hasNext;
  private Long lastId;

  public CursorResult(List<T> values, Boolean hasNext, Long lastId){
    this.values = values;
    this.hasNext = hasNext;
    this.lastId = lastId;
  }
}
