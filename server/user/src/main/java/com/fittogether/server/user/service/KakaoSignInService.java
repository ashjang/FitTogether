package com.fittogether.server.user.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.user.domain.dto.UserDto;
import com.fittogether.server.user.domain.dto.UserType;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class KakaoSignInService {
    @Value("${kakao.client-id}")
    private String clientId;
    @Value("${kakao.redirect-uri}")
    private String redirectURL;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    // 인가코드로 토큰 받기
    public String getAccessToken(String code) {
        String accessToken = "";

        try {
            URL url = new URL("https://kauth.kakao.com/oauth/token");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=" + clientId);
            sb.append("&redirect_uri=" + redirectURL);
            sb.append("&code=" + code);
            System.out.println(sb);
            bw.write(sb.toString());
            bw.flush();

            int responseCode = connection.getResponseCode();
            System.out.println("connect token = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            String result = "";
            while((line = br.readLine())!=null) {
                result += line;
            }

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            accessToken = element.getAsJsonObject().get("access_token").getAsString();

            br.close();
            bw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return accessToken;
    }

    @Transactional
    // access_token으로 사용자 저장 및 반환
    public UserDto getUserInfo(String accessToken) {
        String nickname = "";
        String email = "";

        try {
            URL url = new URL("https://kapi.kakao.com/v2/user/me");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Authorization", "Bearer " + accessToken);

            int responseCode = connection.getResponseCode();
            System.out.println("responseCode =" + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            String result = "";
            while((line = br.readLine()) != null) {
                result += line;
            }

            JsonParser parser = new JsonParser();
            JsonElement element =  parser.parse(result);
            JsonObject kakaoAccount = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
            email = kakaoAccount.getAsJsonObject().get("email").getAsString();
            email = encryptEmail(email) + "@kakao.com";

        } catch (Exception e) {
            e.printStackTrace();
        }

        User user = userRepository.findByEmail(email).orElse(new User());

        if (user.getNickname() == null) {
            user = User.builder()
                    .email(email)
                    .userType(UserType.KAKAO)
                    .build();
            user = userRepository.save(user);
            user.setNickname("kakao_" + user.getUserId());
        }

        return UserDto.from(user);
    }

    // fittogether's 토큰 반환
    public String signIn(UserDto userDto) {
        return jwtProvider.createToken(userDto.getNickname(), userDto.getUserId());
    }

    // 이메일 암호화 - Base64 인코딩
    public static String encryptEmail(String email) {
        byte[] encodedBytes = Base64.getEncoder().encode(email.getBytes());
        return new String(encodedBytes);
    }
}
