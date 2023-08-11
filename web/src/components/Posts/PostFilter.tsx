import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
import styled from '@emotion/styled';
// import { useRecoilState } from 'recoil';
// import { useSetRecoilState } from 'recoil';
// import { postListDataState } from '../../recoil/posts/atoms';

interface CategoryButtonProps {
    active: boolean;
    onClick: () => void;
}

const PostFilter: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [category, setCategory] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const [hashtag, setHashtag] = useState<string>('');

    // const [postListData, setPostListData] = useRecoilState(postListDataState);
    // const setPostListData = useSetRecoilState(postListDataState); //postListData 안쓸거면 이 코드 사용하기.

    // 카테고리로 필터링
    const handleCategoryClick = async (newCategory: string) => {
        try {
            if (category !== newCategory) {
                setCategory(newCategory);
                navigate(`${location.pathname}?category=${newCategory}`);
            } else {
                setCategory('');
                console.log(location.pathname);
                navigate(location.pathname);
            }
            // const response = await axios.post(`/posts/search?category=${category}`);
            // console.log(response.data);

            // setPostListData(response.data);
            // console.log(postListData);
        } catch (error) {
            console.log(error);
        }
    };

    // 검색으로 필터링
    const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };
    const handleKeywordSubmit = async () => {
        try {
            // const response = await axios.post(`/posts/search?title=${keyword}`);
            // console.log(response.data);

            // setPostListData(response.data);
            // console.log(postListData);

            navigate(`${location.pathname}?title=${keyword}`);
            setKeyword(''); // 해시태그 추가 후, 해시태그 입력 필드를 비웁니다.
        } catch (error) {
            console.log(error);
        }
    };

    // 해시태그로 필터링
    const handleHashtagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHashtag(event.target.value);
    };
    const handleHashtagSubmit = async () => {
        try {
            // const response = await axios.post(`/posts/search?${hashtagQueryString}`);
            // console.log(response.data);

            // setPostListData(response.data);
            // console.log(postListData);

            navigate(`${location.pathname}?hashtag=${hashtag}`);
            setHashtag('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PostFilterComponent>
            <CategoryField>
                <CategoryButton
                    active={category === 'RUNNING'}
                    onClick={() => handleCategoryClick('RUNNING')}
                >
                    러닝
                </CategoryButton>
                <CategoryButton
                    active={category === 'HIKING'}
                    onClick={() => handleCategoryClick('HIKING')}
                >
                    등산
                </CategoryButton>
                <CategoryButton
                    active={category === 'WEIGHT'}
                    onClick={() => handleCategoryClick('WEIGHT')}
                >
                    헬스
                </CategoryButton>
            </CategoryField>
            <InputField>
                <PostFilterInput
                    type="text"
                    value={keyword}
                    onChange={handleKeywordChange}
                    placeholder="검색어를 입력하세요"
                />
                <SearchButton onClick={handleKeywordSubmit}>검색</SearchButton>
            </InputField>
            <InputField>
                <PostFilterInput
                    type="text"
                    value={hashtag}
                    onChange={handleHashtagChange}
                    placeholder="태그로 검색해보세요!"
                />
                <SearchButton onClick={handleHashtagSubmit}>검색</SearchButton>
            </InputField>
        </PostFilterComponent>
    );
};

const PostFilterComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 750px;
`;

const CategoryField = styled.div``;

const CategoryButton = styled.button<CategoryButtonProps>`
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 0 5px;
    margin: 5px 10px 5px 0px;
    &:hover {
        border: 2px dashed #b7b7b7;
    }
    background-color: ${(props) => (props.active ? '#d7d7d7' : 'white')};
`;

const InputField = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 5px 0;
`;

const PostFilterInput = styled.input`
    width: 500px;
    height: 40px;
    border: 0;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(222, 222, 222);
`;

const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0px;
    height: 34px;
    padding: 3px 10px 0px;
    border: 0;
    border-radius: 7px;
    margin-right: 3px;
    outline: none;
    background-color: #c7c7c7;
    font-size: 14px;
`;
export default PostFilter;
