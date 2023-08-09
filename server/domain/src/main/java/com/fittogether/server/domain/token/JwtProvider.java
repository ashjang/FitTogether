package com.fittogether.server.domain.token;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Objects;

public class JwtProvider {
    private String secretKey = "fittogethertechtravelersproject";
    private long tokenValidTime = 1000L * 60 * 60 * 24;     // 하루 유효

    // 토큰 생성
    public String createToken(String nickname, Long id) {
        // claims : 토큰에 포함될 정보 (nickname, id)
        Claims claims = Jwts.claims().setSubject(AES256Utils.encrypt(nickname)).setId(AES256Utils.encrypt(id.toString()));
        Date now = new Date();

        // Jwt(토큰) 생성하여 문자열로 반환
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // 토큰이 유효한지(하루)
    public boolean validateToken(String jwtToken) {
        try {
            // 주어진 토큰을 검증하고 claims로 가져옴
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public UserVo getUserVo(String token) {
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();

        // UserVo(id, nickname)
        return new UserVo(Long.valueOf(Objects.requireNonNull(AES256Utils.decrypt(claims.getId()))), AES256Utils.decrypt(claims.getSubject()));
    }
}
