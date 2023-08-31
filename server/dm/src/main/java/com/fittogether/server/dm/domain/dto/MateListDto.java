package com.fittogether.server.dm.domain.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Builder
public class MateListDto {
    private String otherUserNickname;

    private boolean isAccept;

    public static List<MateListDto> from(List<MateListDto> mateList) {
        List<MateListDto> lists = new ArrayList<>();
        for (MateListDto dto : mateList) {
            lists.add(dto);
        }
        return lists;
    }
}
