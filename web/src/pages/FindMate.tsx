import React from 'react';
import styled from '@emotion/styled';
import KakaoMapScriptLoader from '../components/FindMate/KakaoMapScriptLoader';

const FindMate: React.FC = () => {
    return (
        <FindMatePage>
            <PageTitle>운동 메이트 찾기</PageTitle>
            <KakaoMapScriptLoader />
        </FindMatePage>
    );
};

const FindMatePage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 1040px;
    min-height: calc(100vh - 160px);
    margin: 110px auto 0;
    padding: 20px;
    overflow: hidden;
`;

const PageTitle = styled.h2`
    width: 1000px;
`;

export default FindMate;
