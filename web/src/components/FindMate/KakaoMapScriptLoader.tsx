import React from 'react';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Spinner from '../../assets/Spinner.svg';

import Map from './Map';

// KakaoMapScriptLoader.ts
const KAKAO_MAP_SCRIPT_ID = 'kakao-map-script';
const APP_KAKAO_MAP_API_KEY = import.meta.env.VITE_APP_KAKAO_MAP_API_KEY as string;

const KakaoMapScriptLoader: React.FC = () => {
    const [mapScriptLoaded, setmapScriptLoaded] = useState<boolean>(false);

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
                setmapScriptLoaded(true);
            });
        };
        script.onerror = () => {
            setmapScriptLoaded(false);
        };
        document.getElementById('root')?.appendChild(script);
    }, []);

    return <MapLoad>{mapScriptLoaded ? <Map /> : <img src={Spinner} alt="Loading" />}</MapLoad>;
};

const MapLoad = styled.div``;

export default KakaoMapScriptLoader;
