import React from 'react';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Spinner from '../../assets/Spinner.svg';
import Map from './Map';

// Kakao Map API 스크립트를 식별하기 위한 고유한 ID
const KAKAO_MAP_SCRIPT_ID = 'kakao-map-script';

// 환경 변수에서 Kakao Map API 키를 가져옴
const APP_KAKAO_MAP_API_KEY = import.meta.env.VITE_APP_KAKAO_MAP_API_KEY as string;

const KakaoMapScriptLoader: React.FC = () => {
    // Kakao Map API 스크립트 로드 여부를 추적하는 상태
    const [mapScriptLoaded, setmapScriptLoaded] = useState<boolean>(false);

    useEffect(() => {
        // 이미 스크립트가 로드되었거나 Kakao Map 객체가 이미 존재하는 경우 아무 작업도 하지 않음
        const mapScript = document.getElementById(KAKAO_MAP_SCRIPT_ID);
        if (mapScript && !window.kakao) {
            return;
        }

        // Kakao Map API 스크립트 엘리먼트 생성 및 설정
        const script = document.createElement('script');
        script.id = KAKAO_MAP_SCRIPT_ID;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;

        // 스크립트 로드 완료 시 콜백 실행
        script.onload = () => {
            window.kakao.maps.load(() => {
                // Kakao Map API가 로드되면 true로 상태 업데이트
                setmapScriptLoaded(true);
            });
        };

        // 스크립트 로드 실패 시 false로 상태 업데이트
        script.onerror = () => {
            setmapScriptLoaded(false);
        };

        // 스크립트 엘리먼트를 root 엘리먼트에 추가하여 스크립트 로드 시작
        document.getElementById('root')?.appendChild(script);
    }, []);

    // mapScriptLoaded 상태에 따라 Map 컴포넌트 또는 로딩 스피너를 표시
    return (
        <MapLoad>
            {mapScriptLoaded ? <Map /> : <LoadingSpinner src={Spinner} alt="Loading" />}
        </MapLoad>
    );
};

const MapLoad = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingSpinner = styled.img`
    margin-top: 300px;
`;

export default KakaoMapScriptLoader;
