import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { hashtagListState, categoryState, accessLevelState } from '../../recoil/posts/atoms';

// '게시글 수정' 시에만 넘어오는 props의 데이터 타입
interface DataForPostSettingComp {
    savedHashtagList: string[];
    savedCategory: string;
    savedAccessLevel: boolean;
}

const PostSetting: React.FC<DataForPostSettingComp | {}> = (props) => {
    const [hashtag, setHashtag] = useState<string>('');
    const [hashtagList, setHashtagList] = useRecoilState(hashtagListState);
    const [category, setCategory] = useRecoilState(categoryState);
    const [accessLevel, setAccessLevel] = useRecoilState(accessLevelState);

    // 해시태그 인풋 value가 변할 때 마다 상태에 저장하는 함수
    const handleHashtagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 공백은 무시
        const hashtags = event.target.value.split(' ');
        const hashtagString = hashtags.join('');
        setHashtag(hashtagString);
    };

    // 해시태그 인풋에서 엔터키를 처리하기 위한 함수
    const handleHashtagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            // 기존 값은 유지하고 새로운 값을 추가
            setHashtagList([...hashtagList, hashtag]);
            // 입력 필드 초기화
            event.currentTarget.value = '';
        }
    };

    // 해시태그의 'X' 버튼을 누를때 해당 해시태그를 상태에서 지우는 함수
    const handleRemoveHashtag = (index: number) => {
        const updatedHashtagList = [...hashtagList];
        updatedHashtagList.splice(index, 1); // 해당 index의 요소를 1개 삭제 후 새로운 배열을 반환
        setHashtagList(updatedHashtagList); // 반환받은 새로운 배열로 상태 업데이트
    };

    // 카테고리를 선택하는 함수
    const handleCategoryClick = (newCategory: string) => {
        // 이전 선택과 다른 카테고리를 선택했을 때만 업데이트
        if (category !== newCategory) {
            setCategory(newCategory);
        } else {
            // 이미 선택된 카테고리를 다시 클릭했을 때 초기 상태로 돌아오게 처리
            setCategory('');
        }
    };

    useEffect(() => {
        // '게시글 수정'인지, '게시글 작성'인지 구별하여 PostSetting 컴포넌트의 초기값 설정
        if (
            'savedHashtagList' in props &&
            'savedCategory' in props &&
            'savedAccessLevel' in props
        ) {
            setHashtagList(props.savedHashtagList);
            setCategory(props.savedCategory);
            setAccessLevel(props.savedAccessLevel);
        } else {
            setHashtagList([]);
            setCategory('');
            setAccessLevel(true);
        }
    }, []);

    return (
        <PostSettingComponent>
            <SettingItem>
                <About>해시태그</About>
                <HashtagInput
                    name="hashtag"
                    type="text"
                    onChange={handleHashtagInputChange}
                    onKeyDown={handleHashtagInputKeyDown}
                />
                <HashtagList>
                    {hashtagList &&
                        hashtagList.map((keyword, index) => (
                            <HashtagItem key={index}>
                                {`#${keyword}`}
                                <RemoveButton
                                    type="button"
                                    onClick={() => handleRemoveHashtag(index)}
                                >
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
                        className={category === 'RUNNING' ? 'active' : ''}
                        onClick={() => handleCategoryClick('RUNNING')}
                    >
                        러닝
                    </CategoryButton>
                    <CategoryButton
                        type="button"
                        className={category === 'HIKING' ? 'active' : ''}
                        onClick={() => handleCategoryClick('HIKING')}
                    >
                        등산
                    </CategoryButton>
                    <CategoryButton
                        type="button"
                        className={category === 'WEIGHT' ? 'active' : ''}
                        onClick={() => handleCategoryClick('WEIGHT')}
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
                        className={accessLevel === true ? 'active' : ''}
                        onClick={() => setAccessLevel(true)}
                    >
                        전체
                    </PublicButton>
                    <PublicButton
                        type="button"
                        className={accessLevel === false ? 'active' : ''}
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
    top: 50px;
    width: 850px;
`;

const SettingItem = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
`;

const About = styled.p`
    width: 100px;
    font-weight: bold;
    margin-top: 5px;
`;

const HashtagInput = styled.input`
    width: 175px;
    padding: 3px 15px;
    border-style: none;
    border-radius: 15px;
    background-color: #eee;
    &:focus {
        outline: none;
    }
`;

const HashtagList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const HashtagItem = styled.span`
    background-color: #b0e0e6;
    padding: 0 5px;
    border-radius: 8px;
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

const CategoryButton = styled.button`
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 0 5px;
    margin: 0px 10px 0px 0px;
    background-color: #eee;
    &:hover {
        border: 2px dashed #b7b7b7;
    }
    &.active {
        background-color: #b0e0e6;
    }
`;

const PublicTab = styled.div`
    display: flex;
`;

const PublicButton = styled.button`
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 0 5px;
    margin: 0px 10px 0px 0px;
    background-color: #eee;
    &:hover {
        border: 2px dashed #b7b7b7;
    }
    &.active {
        background-color: #b0e0e6;
    }
`;

export default PostSetting;
