package com.fittogether.server.user.domain.dto;

import lombok.Builder;

@Builder
public class LocationDto {
    private Double latitude;
    private Double longitude;
}
