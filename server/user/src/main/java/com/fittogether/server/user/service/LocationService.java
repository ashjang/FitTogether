package com.fittogether.server.user.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.user.domain.dto.AnotherUserDto;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private static final double EARTHRADIUS = 6371;
    private static final int BOUNDARY = 3;

    // 현재 나의 위치 업데이트
    @Transactional
    public void updateMyLocation(String token, Double latitude, Double longitude) {
        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NEED_TO_SIGNIN);
        }

        UserVo userVo = jwtProvider.getUserVo(token);
        User user = userRepository.findById(userVo.getUserId())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        user.setLatitude(latitude);
        user.setLongitude(longitude);
    }

    public List<AnotherUserDto> getUsersWithin3km(String token) {
        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NEED_TO_SIGNIN);
        }

        UserVo userVo = jwtProvider.getUserVo(token);
        User user = userRepository.findById(userVo.getUserId())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        double lat = user.getLatitude();
        double lng = user.getLongitude();

        Map<String, Double> boundary = calculateRangeLatAndLng(lat, lng);
        double minLat = boundary.get("minLat");
        double maxLat = boundary.get("maxLat");
        double minLng = boundary.get("minLng");
        double maxLng = boundary.get("maxLng");

        List<User> users = userRepository.findByLatitudeBetweenAndLongitudeBetweenAndPublicInfo(
                minLat, maxLat, minLng, maxLng, true);

        if (users.isEmpty()) {
            throw new UserCustomException(UserErrorCode.NOT_FOUND_USER);
        }

        return users.stream().map(AnotherUserDto::from).collect(Collectors.toList());
    }

    // 3km 내 위도, 경도 범위 구하기
    private Map<String, Double> calculateRangeLatAndLng(double lat, double lng) {
        double latRange = Math.toDegrees(BOUNDARY / EARTHRADIUS);
        double lngRange = Math.toDegrees(BOUNDARY / (EARTHRADIUS * Math.cos(Math.toRadians(lat))));

        double minLat = lat - latRange;
        double maxLat = lat + latRange;
        double minLng = lng - lngRange;
        double maxLng = lng + lngRange;

        Map<String, Double> result = new HashMap<>();
        result.put("minLat", minLat);
        result.put("maxLat", maxLat);
        result.put("minLng", minLng);
        result.put("maxLng", maxLng);

        return result;
    }
}
