package com.fittogether.server.notification.domain.dto;

public enum NotificationType {
    POST_REPLY,         // 게시글 댓글
    POST_LIKE,          // 게시글 좋아요
    RE_REPLY,           // 댓글에 대한 대댓글
    DM,                 // 채팅
    MATCHING            // 운동메이트 요청
}
