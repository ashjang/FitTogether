/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { totalPageState, postListDataState, currentPageState } from '../../recoil/posts/atoms';
import {
    categoryFilterState,
    keywordFilterState,
    hashtagFilterState,
    keywordItemState,
    hashtagItemState,
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
    const [keywordItem, setKeywordItem] = useRecoilState<string>(keywordItemState);
    const [hashtagFilter, setHashtagFilter] = useRecoilState<string>(hashtagFilterState);
    const [hashtagItem, setHashtagItem] = useRecoilState<string>(hashtagItemState);

    const handlePaginationBtnClick = async (i: number) => {
        setCurrentPage(i);
        navigate(`${location.pathname}?page=${i}`);
    };

    // 카테고리 탭 클릭 시 value를 저장하는 함수
    const handleCategoryClick = async (newCategory: string) => {
        // 다른 필터링 상태들은 초기화
        setHashtagFilter('');
        setHashtagItem('');
        setKeywordFilter('');
        setKeywordItem('');

        // 새로운 카테고리가 기존 카테고리와 다르다면 카테고리 상태 업데이트
        if (categoryFilter !== newCategory) {
            setCategoryFilter(newCategory);
        }
        // 기존과 같다면 초기화하여 필터링 없는 상태의 postListData를 불러옴
        else {
            setCategoryFilter('');
        }
        setCurrentPage(1);
    };

    // 키워드 인풋 value가 변할 때 마다 상태에 저장하는 함수
    const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeywordFilter(event.target.value);
    };

    // 해시태그 인풋 value가 변할 때 마다 상태에 저장하는 함수
    const handleHashtagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHashtagFilter(event.target.value);
    };

    // 키워드 인풋에서 엔터키 입력을 처리하여 필터링 하는 함수
    const handleEnterPressInKeyword = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (keywordFilter !== '') {
                getFilteredKeyword();
            }
        }
    };

    // 해시태그 인풋에서 엔터키 입력을 처리하여 필터링 하는 함수
    const handleEnterPressInHashtag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (hashtagFilter !== '') {
                getFilteredHashtag();
            }
        }
    };

    // 필터링없는 상태의 postListData를 얻는 함수 (API: allPost)
    const getPostListData = async () => {
        // 필터링 관련 상태는 초기화
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

    // 카테고리로 필터링된 postListData를 얻는 함수 (API: getPostByCategory)
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

    // 키워드로 필터링된 postListData를 얻는 함수 (API: getPostByTitle)
    const getFilteredKeyword = async () => {
        // 다른 필터링 상태들은 초기화하고 키워드 관련 상태만 업데이트
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

    // 해시태그로 필터링된 postListData를 얻는 함수 (API: getPostByHashtag)
    const getFilteredHashtag = async () => {
        // 다른 필터링 상태들은 초기화하고 해시태그 관련 상태만 업데이트
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
            alert('해당 해시태그로 작성된 게시글이 없습니다.');
            setHashtagFilter('');
            setHashtagItem('');
        }
    };

    // 페이지네이션 혹은 필터링 관련 상태들이 변경될 때 실행될 함수
    useEffect(() => {
        // 페이지 최상단으로 이동
        window.scrollTo(0, 0);

        // 각 필터링 요소의 상태에 따른 호출 함수 정의
        if (categoryFilter === '' && keywordFilter === '' && hashtagFilter === '') {
            getPostListData();
        } else if (categoryFilter !== '') {
            getFilteredCategory();
        } else if (keywordItem !== '') {
            getFilteredKeyword();
        } else if (hashtagItem !== '') {
            getFilteredHashtag();
        }
    }, [currentPage, categoryFilter, keywordItem, hashtagItem]);

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
            {/* 페이지네이션 요소 */}
            {/* 버튼을 누르면 현재 페이지 상태를 업데이트 */}
            <ButtonContainer>
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
            </ButtonContainer>
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
    border-style: none;
    border-radius: 10px;
    padding: 3px 10px;
    margin: 5px 10px 10px 0px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? '#ffc0cb' : '#dddddd')};
    box-shadow: 2.5px 5px 10px rgba(0, 0, 0, 0.5);
    font-size: 18px;
    &:hover {
        background-color: #ffd0dd;
    }
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

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0px;
    width: max-content;
    margin: 0px auto;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1000px;
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
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
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
