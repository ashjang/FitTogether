import React, { useState } from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
    active: boolean;
    onClick: () => void;
}

const PostSetting: React.FC = () => {
    const [category, setCategory] = useState<string>('');
    const [accessLevel, setAccessLevel] = useState(true);

    const handleCategoryClick = (newCategory: string) => {
        // 이전 선택과 다른 카테고리를 선택했을 때만 업데이트
        if (category !== newCategory) {
            setCategory(newCategory);
        } else {
            // 이미 선택된 카테고리를 다시 클릭했을 때 초기 상태(모든 카테고리)로 돌아오게 처리
            setCategory('');
        }
    };

    return (
        <PostSettingComponent>
            <SettingItem>
                <About>해시태그</About>
                <input />
            </SettingItem>
            <SettingItem>
                <About>카테고리</About>
                <CategoryTab>
                    <CategoryButton
                        active={category === '러닝'}
                        onClick={() => handleCategoryClick('러닝')}
                    >
                        러닝
                    </CategoryButton>
                    <CategoryButton
                        active={category === '등산'}
                        onClick={() => handleCategoryClick('등산')}
                    >
                        등산
                    </CategoryButton>
                    <CategoryButton
                        active={category === '헬스'}
                        onClick={() => handleCategoryClick('헬스')}
                    >
                        헬스
                    </CategoryButton>
                </CategoryTab>
            </SettingItem>
            <SettingItem>
                <About>공개 범위</About>
                <PublicTab>
                    <PublicButton
                        active={accessLevel === true}
                        onClick={() => setAccessLevel(true)}
                    >
                        전체
                    </PublicButton>
                    <PublicButton
                        active={accessLevel === false}
                        onClick={() => setAccessLevel(false)}
                    >
                        메이트
                    </PublicButton>
                </PublicTab>
            </SettingItem>
            <SubmitButton>등록</SubmitButton>
        </PostSettingComponent>
    );
};

const PostSettingComponent = styled.div`
    position: relative;
    width: 850px;
`;

const SettingItem = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const About = styled.p`
    width: 100px;
`;

const CategoryTab = styled.div`
    display: flex;
`;

const CategoryButton = styled.button<ButtonProps>`
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 0 5px;
    margin: 0px 10px 0px 0px;
    &:hover {
        border: 2px dashed #b7b7b7;
    }
    background-color: ${(props) => (props.active ? '#d7d7d7' : 'white')};
`;

const PublicTab = styled.div`
    display: flex;
`;

const PublicButton = styled.button<ButtonProps>`
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 0 5px;
    margin: 0px 10px 0px 0px;
    &:hover {
        border: 2px dashed #b7b7b7;
    }
    background-color: ${(props) => (props.active ? '#d7d7d7' : 'white')};
`;

const SubmitButton = styled.button`
    position: absolute;
    right: 0;
`;

export default PostSetting;
