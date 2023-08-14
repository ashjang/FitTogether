/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import PostListItem from '../common/PostListItem';
import styled from '@emotion/styled';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { postListDataState } from '../../recoil/posts/atoms';

const PostList: React.FC = () => {
    const [page, setPage] = useState<number>(1); // 현재 페이지
    const [postListData, setPostListData] = useRecoilState(postListDataState); // 게시글 데이터
    const limit: number = 5; // 한 페이지에 담길 수 있는 최대 PostListItem

    const getPostListData = async () => {
        try {
            const response = await axios.get('/api/posts/search');
            setPostListData(response.data);
        } catch (error) {
            console.error;
        }
    };

    useEffect(() => {
        getPostListData();
    }, []);

    const dataArrayLength: number = postListData ? postListData.length : 0; // 데이터 배열의 길이. 즉, 총 PostListItem 수
    const offset: number = (page - 1) * limit; // 각 페이지의 첫번째 PostlistItem의 Index
    const numPages: number = Math.ceil(dataArrayLength / limit); // 총 페이지 수

    const currentPageGroup: number = Math.ceil(page / 5); // 현재 페이지 그룹
    const startPage: number = (currentPageGroup - 1) * 5 + 1; // 현재 페이지 그룹에서 시작페이지
    const endPage: number = Math.min(currentPageGroup * 5, numPages); // 현재 페이지 그룹에서 마지막 페이지

    return (
        <PostListComponent>
            <PostListItems>
                {postListData ? (
                    postListData
                        .slice(offset, offset + limit)
                        .map((post) => <PostListItem key={post.postId} {...post} />)
                ) : (
                    <div>Loading...</div>
                )}
            </PostListItems>
            <ButtonGroup>
                <PaginationButton onClick={() => setPage(page - 1)} disabled={page === 1}>
                    &lt;
                </PaginationButton>
                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, index) => startPage + index
                ).map((item) => (
                    <PaginationButton
                        key={item}
                        onClick={() => setPage(item)}
                        css={item === page ? selectedButton : unselectedButton}
                    >
                        {item}
                    </PaginationButton>
                ))}
                <PaginationButton onClick={() => setPage(page + 1)} disabled={page === numPages}>
                    &gt;
                </PaginationButton>
            </ButtonGroup>
        </PostListComponent>
    );
};

const PostListComponent = styled.div``;

const PostListItems = styled.div`
    width: 750px;
`;

const ButtonGroup = styled.div`
    width: max-content;
    margin: 0 auto;
`;

const PaginationButton = styled.button`
    width: 25px;
`;

const unselectedButton = css``;

const selectedButton = css`
    font-weight: bold;
`;

export default PostList;
