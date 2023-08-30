package com.fittogether.server.notification.domain.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.annotation.PreDestroy;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@RequiredArgsConstructor
public class EmitterRepository {
    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    public void save(Long id, SseEmitter emitter) {
        emitters.put(id, emitter);
    }

    public void deleteById(Long id) {
        emitters.remove(id);
    }

    public SseEmitter get(Long id) {
        if (emitters.containsKey(id)) {
            return emitters.get(id);
        } else {
            return null;
        }
    }

    @PreDestroy
    public void cleanup() {
        // 애플리케이션 종료 시 호출되는 메서드
        // 여기에서 리포지토리 등의 정리 작업을 수행할 수 있음
        emitters.clear();
    }
}
