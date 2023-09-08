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
            <CategoryBtnTab>
                <CategoryBtn
                    className={category === 'running' ? 'active' : ''}
                    onClick={() => handleTabClick('running')}
                >
                    러닝
                </CategoryBtn>
                <CategoryBtn
                    className={category === 'hiking' ? 'active' : ''}
                    onClick={() => handleTabClick('hiking')}
                >
                    등산
                </CategoryBtn>
                <CategoryBtn
                    className={category === 'health' ? 'active' : ''}
                    onClick={() => handleTabClick('health')}
                >
                    헬스
                </CategoryBtn>
            </CategoryBtnTab>
            <VideoList />
        </ExerciseInfoPage>
    );
};

const ExerciseInfoPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 1440px;
    min-height: calc(100vh - 200px);
    margin: 120px auto 0;
    padding: 20px 60px;
`;

const PageTitle = styled.h2`
    width: 1440px;
    padding: 0 60px;
`;

const CategoryBtnTab = styled.div`
    margin-top: 30px;
`;

const CategoryBtn = styled.button`
    border-style: none;
    border-radius: 10px;
    padding: 3px 10px;
    margin: 0px 5px;
    cursor: pointer;
    background-color: #dddddd;
    box-shadow: 2.5px 5px 10px rgba(0, 0, 0, 0.5);
    font-size: 18px;
    &.active {
        background-color: #ffc0cb;
    }
    &:hover {
        background-color: #ffd0dd;
    }
`;

export default ExerciseInfo;
