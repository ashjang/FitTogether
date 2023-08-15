import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import Map from './Map';

// KakaoMapScriptLoader.ts
const KAKAO_MAP_SCRIPT_ID = 'kakao-map-script';
const APP_KAKAO_MAP_API_KEY = import.meta.env.VITE_APP_KAKAO_MAP_API_KEY;

const KakaoMapScriptLoader: React.FC = () => {
    const [mapScriptLoaded, setmapScriptLoaded] = useState(false);

    useEffect(() => {
        const mapScript = document.getElementById(KAKAO_MAP_SCRIPT_ID);

        if (mapScript && !window.kakao) {
            return;
        }

        // script
        const script = document.createElement('script');
        script.id = KAKAO_MAP_SCRIPT_ID;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;

        script.onload = () => {
            window.kakao.maps.load(() => {
                // TODO: 성공
                setmapScriptLoaded(true);
            });
        };
        script.onerror = () => {
            // TODO: 실패
            setmapScriptLoaded(false);
        };
        document.getElementById('root')?.appendChild(script);
    }, []);

    return (
        <MapInn>
            <PageTitle>운동 메이트 찾기</PageTitle>
            <MapLoad>
                {mapScriptLoaded ? <Map category="러닝" /> : <div>지도를 가져오는 중입니다.</div>}
            </MapLoad>
        </MapInn>
    );
};
const MapInn = styled.div`
    position: relative;
    max-width: 1440px;
    min-height: 100vh;
    margin: 120px auto 0;
    padding: 20px 60px;
    box-sizing: border-box;
    background-color: #f8f8f8;
`;
const PageTitle = styled.h2`
    position: relative;
    z-index: 1;
    &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -10px;
        width: 100%;
        height: 1px;
        color: #000;
        background-color: #000;
    }
`;

// MapLoad
const MapLoad = styled.div`
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
`;
export default KakaoMapScriptLoader;
