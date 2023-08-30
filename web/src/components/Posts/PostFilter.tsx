/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { totalPageState, postListDataState, currentPageState } from '../../recoil/posts/atoms';
import {
    categoryFilterState,
    keywordFilterState,
    hashtagFilterState,
} from '../../recoil/posts/atoms';
import { css } from '@emotion/react';

interface CategoryButtonProps {
    active: boolean;
    onClick: () => void;
}

const PostFilter: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [totalPages, setTotalPages] = useRecoilState(totalPageState);
    const setPostListData = useSetRecoilState(postListDataState);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [categoryFilter, setCategoryFilter] = useRecoilState<string>(categoryFilterState);
    const [keywordFilter, setKeywordFilter] = useRecoilState<string>(keywordFilterState);
    const [keywordItem, setKeywordItem] = useState<string>('');
    const [hashtagFilter, setHashtagFilter] = useRecoilState<string>(hashtagFilterState);
    const [hashtagItem, setHashtagItem] = useState<string>('');

    const handlePaginationBtnClick = async (i: number) => {
        setCurrentPage(i);
        navigate(`${location.pathname}?page=${i}`);
    };

    // 필터링없는 상태에서 postListData 얻기
    const getPostListData = async () => {
        setHashtagFilter('');
        setHashtagItem('');
        setKeywordFilter('');
        setKeywordItem('');
        try {
            const response = await axios.get(`/api/posts/search?page=${currentPage - 1}&size=10`);
            const numPages: number = Math.ceil(response.data.totalPostCount / 10); // 총 페이지 수
            setTotalPages(numPages);
            setPostListData(response.data.postList);
        } catch (error) {
            console.error;
        }
    };

    // 카테고리 탭으로 필터링
    const handleCategoryClick = async (newCategory: string) => {
        setHashtagFilter('');
        setHashtagItem('');
        setKeywordFilter('');
        setKeywordItem('');
        console.log('newCategory', newCategory);
        if (categoryFilter !== newCategory) {
            setCategoryFilter(newCategory);
        } else {
            setCategoryFilter('');
        }
        setCurrentPage(1);
    };

    const getFilteredCategory = async () => {
        try {
            const response = await axios.get(
                `/api/posts/search/category?category=${categoryFilter}&page=${
                    currentPage - 1
                }&size=10`
            );
            setPostListData(response.data.postList);
            const page: number = Math.ceil(response.data.totalPostCount / 10);
            setTotalPages(page);

            navigate(`${location.pathname}?category=${categoryFilter}&page=${currentPage}`);
        } catch (error) {
            console.error(error);
        }
    };

    // 키워드 검색으로 필터링
    const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeywordFilter(event.target.value);
    };
    const getFilteredKeyword = async () => {
        setCategoryFilter('');
        setHashtagFilter('');
        setHashtagItem('');
        setKeywordItem(keywordFilter);
        try {
            const response = await axios.get(
                `/api/posts/search/title?page=${currentPage - 1}&size=10&title=${keywordFilter}`
            );
            setPostListData(response.data.postList);
            const page: number = Math.ceil(response.data.totalPostCount / 10);
            setTotalPages(page);

            navigate(`${location.pathname}?&title=${keywordFilter}&page=${currentPage}`);
            setKeywordFilter('');
        } catch (error) {
            console.error(error);
        }
    };

    // 해시태그 검색으로 필터링
    const handleHashtagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHashtagFilter(event.target.value);
    };
    const getFilteredHashtag = async () => {
        setCategoryFilter('');
        setKeywordFilter('');
        setKeywordItem('');
        setHashtagItem(hashtagFilter);
        try {
            const response = await axios.get(
                `/api/posts/search/hashtag?hashtag=${hashtagFilter}&page=${currentPage - 1}&size=10`
            );
            setPostListData(response.data.postList);
            const page: number = Math.ceil(response.data.totalPostCount / 10);
            setTotalPages(page);

            navigate(`${location.pathname}?hashtag=${hashtagFilter}&page=${currentPage}`);
            setHashtagFilter('');
        } catch (error) {
            console.error(error);
            alert('검색된 게시글이 없습니다.');
            setHashtagFilter('');
            setHashtagItem('');
        }
    };

    const handleEnterPressInKeyword = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (keywordFilter !== '') {
                getFilteredKeyword();
            }
        }
    };

    const handleEnterPressInHashtag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (hashtagFilter !== '') {
                getFilteredHashtag();
            }
        }
    };

    useEffect(() => {
        if (categoryFilter === '' && keywordFilter === '' && hashtagFilter === '') {
            getPostListData();
        } else if (categoryFilter !== '') {
            getFilteredCategory();
        } else if (keywordFilter !== '') {
            getFilteredKeyword();
        } else if (hashtagFilter !== '') {
            getFilteredHashtag();
        }
    }, [currentPage, categoryFilter]);

    return (
        <PostFilterComponent>
            <CategoryField>
                <CategoryButton
                    active={categoryFilter === 'RUNNING'}
                    onClick={() => handleCategoryClick('RUNNING')}
                >
                    러닝
                </CategoryButton>
                <CategoryButton
                    active={categoryFilter === 'HIKING'}
                    onClick={() => handleCategoryClick('HIKING')}
                >
                    등산
                </CategoryButton>
                <CategoryButton
                    active={categoryFilter === 'WEIGHT'}
                    onClick={() => handleCategoryClick('WEIGHT')}
                >
                    헬스
                </CategoryButton>
            </CategoryField>
            <InputField>
                <PostFilterInput
                    type="text"
                    value={keywordFilter}
                    onChange={handleKeywordChange}
                    onKeyDown={handleEnterPressInKeyword}
                    placeholder="제목을 검색해보세요!"
                />
                <SearchButton type="button" onClick={getFilteredKeyword}>
                    검색
                </SearchButton>
                {keywordItem && (
                    <CurrentFilterItem>
                        {keywordItem}
                        <FilterResetButton type="button" onClick={getPostListData}>
                            X
                        </FilterResetButton>
                    </CurrentFilterItem>
                )}
            </InputField>
            <InputField>
                <PostFilterInput
                    type="text"
                    value={hashtagFilter}
                    onChange={handleHashtagChange}
                    onKeyDown={handleEnterPressInHashtag}
                    placeholder="태그로 검색해보세요!"
                />
                <SearchButton type="button" onClick={getFilteredHashtag}>
                    검색
                </SearchButton>
                {hashtagItem && (
                    <CurrentFilterItem>
                        {`#${hashtagItem}`}
                        <FilterResetButton type="button" onClick={getPostListData}>
                            X
                        </FilterResetButton>
                    </CurrentFilterItem>
                )}
            </InputField>
            <ButtonGroup>
                <PaginationButtonArrow
                    onClick={() => {
                        setCurrentPage(currentPage - 1);
                        navigate(`${location.pathname}?page=${currentPage - 1}`);
                    }}
                    disabled={currentPage === 1}
                >
                    &lt;
                </PaginationButtonArrow>
                {(() => {
                    const buttons = [];
                    for (let i = 1; i <= totalPages; i++) {
                        buttons.push(
                            <PaginationButtonNumber
                                key={i}
                                onClick={() => handlePaginationBtnClick(i)}
                                css={i === currentPage ? selectedButton : unselectedButton}
                            >
                                {i}
                            </PaginationButtonNumber>
                        );
                    }
                    return buttons;
                })()}
                <PaginationButtonArrow
                    onClick={() => {
                        setCurrentPage(currentPage + 1);
                        navigate(`${location.pathname}?page=${currentPage + 1}`);
                    }}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </PaginationButtonArrow>
            </ButtonGroup>
        </PostFilterComponent>
    );
};

const PostFilterComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 1000px;
`;

const CategoryField = styled.div``;

const CategoryButton = styled.button<CategoryButtonProps>`
    border: 2px solid transparent;
    border-radius: 15px;
    padding: 0 5px;
    margin: 5px 10px 5px 0px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? '#888888' : '#bbbbbb')};
    &:hover {
        background-color: #888888;
        color: #ffffff;
    }
    color: ${(props) => (props.active ? '#ffffff' : '#000000')};
    font-size: 18px;
`;

const InputField = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 100%;
    margin: 5px 0;
`;

const PostFilterInput = styled.input`
    width: 500px;
    height: 45px;
    border: 0;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(222, 222, 222);
    font-size: 18px;
`;

const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 445px;
    height: 35px;
    padding: 3px 10px;
    border: 0;
    border-radius: 7px;
    margin-right: 3px;
    outline: none;
    color: white;
    background-color: #aaaaaa;
    font-size: 16px;
`;

const CurrentFilterItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 500px;
    background-color: #f0f0f0;
    padding: 0 5px;
    border-radius: 12px;
    margin: 0 10px;
`;

const FilterResetButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    padding-top: 3px;
    margin-left: 5px;
    font-size: 12px;
    color: red;
`;

const ButtonGroup = styled.div`
    position: absolute;
    bottom: 0px;
    left: 45%;
    width: max-content;
    margin: 0px auto;
`;

const PaginationButtonNumber = styled.button`
    width: 25px;
    background-color: #d7d7d7;
    border: 1px solid treansparent;
    border-style: none;
    border-radius: 5px;
    margin: 3px;
    cursor: pointer;
    color: #666666;
    &:hover {
        background-color: #a1c9e4;
    }
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
`;

const PaginationButtonArrow = styled.button`
    width: 25px;
    border: 0px;
    background-color: transparent;
    color: #a7a7a7;
    font-weight: bold;
`;

const unselectedButton = css``;

const selectedButton = css`
    font-weight: bold;
`;

export default PostFilter;
