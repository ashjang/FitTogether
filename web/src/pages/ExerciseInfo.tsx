import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { categoryRecoil } from '../recoil/video/atoms';
import VideoList from '../components/ExerciseInfo/VideoList';
// import { resetTotalResults } from '../components/ExerciseInfo/YoutubeApi';

const ExerciseInfo: React.FC = () => {
    const [category, setCategory] = useRecoilState<string>(categoryRecoil);

    const handleTabClick = useCallback((newCategory: string) => {
        setCategory('');
        // resetTotalResults();
        setCategory(newCategory);
    }, []);

    return (
        <ExerciseInfoPage>
            <PageTitle>운동 정보</PageTitle>
            <BtnTab>
                <button
                    className={`category01 ${category === 'running' ? 'active' : ''}`}
                    onClick={() => handleTabClick('running')}
                >
                    러닝
                </button>
                <button
                    className={`category02 ${category === 'hiking' ? 'active' : ''}`}
                    onClick={() => handleTabClick('hiking')}
                >
                    등산
                </button>
                <button
                    className={`category03 ${category === 'health' ? 'active' : ''}`}
                    onClick={() => handleTabClick('health')}
                >
                    헬스
                </button>
            </BtnTab>
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

const BtnTab = styled.div`
    margin-top: 10px;
    position: relative;
    top: 60px;
    z-index: 10;

    button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-style: none;
        border-radius: 15px;
        padding: 3px 10px;
        background-color: #fff;
        box-shadow: 2.5px 5px 10px rgba(0, 0, 0, 0.5);

        &.active {
            background-color: #000;
            color: #fff;
        }
    }
    .category01 {
        left: 43.75%;
        transform: translateX(-40%);
    }
    .category03 {
        left: 56.3%;
        transform: translateX(-60%);
    }
`;

export default ExerciseInfo;
