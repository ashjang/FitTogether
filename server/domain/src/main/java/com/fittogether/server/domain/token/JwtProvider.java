package com.fittogether.server.domain.token;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Date;
import java.util.concurrent.TimeUnit;

public class JwtProvider {
    private String secretKey = "fittogethertechtravelersproject";
    private long tokenValidTime = 1000L * 60 * 60 * 24;     // 하루 유효
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    // 토큰 생성
    public String createToken(String nickname, Long id) {
        // claims : 토큰에 포함될 정보 (nickname, id)
        Claims claims = Jwts.claims().setSubject(AES256Utils.encrypt(nickname));
        Date now = new Date();

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        redisTemplate.opsForValue().set(token, id.toString(), 24, TimeUnit.HOURS);
        return token;
    }

    // 토큰이 유효한지(하루)
    public boolean validateToken(String jwtToken) {
        return redisTemplate.hasKey(jwtToken);
    }

    public UserVo getUserVo(String token) {
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();

        // UserVo(id, nickname)
        return new UserVo(Long.valueOf(redisTemplate.opsForValue().get(token)), AES256Utils.decrypt(claims.getSubject()));
    }

    // 토큰 무효화시키기 for 로그아웃
    public boolean invalidateToken(String jwtToken) {
        redisTemplate.delete(jwtToken);
        return validateToken(jwtToken);
    }
}

