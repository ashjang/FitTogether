import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

const UserKakaoMap = ({ map }: { map: window.kakao.maps.Map }) => {
    const [clickEventEnabled, setClickEventEnabled] = useState(false);

    const handleMapClick = async (mouseEvent: any) => {
        if (clickEventEnabled) {
            const newMarkerPosition = mouseEvent.latLng;
            // 이하 클릭 이벤트 핸들러 내용
            // Kakao Geocoding API를 사용하여 주소와 위도/경도 값을 얻어내고
            // 새로운 마커를 생성하고 서버로 전송하는 로직 등을 처리할 수 있습니다.
        }
    };

    const handleAddMarkerClick = () => {
        setClickEventEnabled(true);
        if (map) {
            window.kakao.maps.event.addListener(map, 'click', handleMapClick);
        }
    };

    return (
        <UserMarker>
            <div id="kakao-map" style={{ width: '100%', height: '400px' }}></div>
            <button onClick={handleAddMarkerClick}>내 위치 등록하기</button>
        </UserMarker>
    );
};

const UserMarker = styled.div`
    position: relative;
    z-index: 10;
`;

export default UserKakaoMap;
