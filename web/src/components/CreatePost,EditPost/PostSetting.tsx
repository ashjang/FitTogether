import React, { useState } from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
    active: boolean;
    onClick: () => void;
}

const PostSetting: React.FC = () => {
    const [hashtag, setHashtag] = useState<string>('');
    const [hashtagList, setHashtagList] = useState<string[]>([]);
    const [category, setCategory] = useState<string>('');
    const [accessLevel, setAccessLevel] = useState(true);

    const handleHashtagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 해시태그 입력 필드가 변경될 때 호출되는 함수
        const hashtags = event.target.value.split(' ');
        const hashtagString = hashtags.join('');
        setHashtag(hashtagString);
    };

    const handleHashtagInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Enter 키 누를 때 호출되는 함수
        if (event.key === 'Enter') {
            event.preventDefault();
            setHashtagList([...hashtagList, `#${hashtag}`]);
            event.currentTarget.value = ''; // 입력 필드를 비웁니다.
        }
    };

    const handleRemoveHashtag = (index: number) => {
        const updatedHashtagList = [...hashtagList];
        updatedHashtagList.splice(index, 1);
        setHashtagList(updatedHashtagList);
    };

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
                <HashtagInput
                    type="text"
                    onChange={handleHashtagInputChange}
                    onKeyPress={handleHashtagInputKeyPress}
                />
                <HashtagList>
                    {hashtagList.map((keyword, index) => (
                        <HashtagItem key={index}>
                            {keyword}
                            <RemoveButton type="button" onClick={() => handleRemoveHashtag(index)}>
                                X
                            </RemoveButton>
                        </HashtagItem>
                    ))}
                </HashtagList>
            </SettingItem>
            <SettingItem>
                <About>카테고리</About>
                <CategoryTab>
                    <CategoryButton
                        type="button"
                        active={category === '러닝'}
                        onClick={() => handleCategoryClick('러닝')}
                    >
                        러닝
                    </CategoryButton>
                    <CategoryButton
                        type="button"
                        active={category === '등산'}
                        onClick={() => handleCategoryClick('등산')}
                    >
                        등산
                    </CategoryButton>
                    <CategoryButton
                        type="button"
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
                        type="button"
                        active={accessLevel === true}
                        onClick={() => setAccessLevel(true)}
                    >
                        전체
                    </PublicButton>
                    <PublicButton
                        type="button"
                        active={accessLevel === false}
                        onClick={() => setAccessLevel(false)}
                    >
                        메이트
                    </PublicButton>
                </PublicTab>
            </SettingItem>
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

const HashtagInput = styled.input`
    border-style: none;
    &:focus {
        outline: none;
    }
`;

const HashtagList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const HashtagItem = styled.span`
    background-color: #f0f0f0;
    padding: 0 5px;
    border-radius: 12px;
    margin: 0 10px;
`;

const RemoveButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    margin-left: 5px;
    font-size: 12px;
    color: red;
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

export default PostSetting;
