import React from 'react';
import styled from '@emotion/styled';
import VideoList from '../components/ExerciseInfo/VideoList';

const ExerciseInfo: React.FC = () => {
    return (
        <ExerciseInfoPage>
            <PageTitle>운동 정보</PageTitle>
            <VideoList />
        </ExerciseInfoPage>
    );
};

const ExerciseInfoPage = styled.div`
    width: 1440px;
    min-height: calc(100vh - 200px);
    margin: 120px auto 0;
    padding: 20px 60px;
`;

const PageTitle = styled.h2`
    position: relative;

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

export default ExerciseInfo;
