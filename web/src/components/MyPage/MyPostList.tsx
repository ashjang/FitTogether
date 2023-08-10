/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import PostListItem from '../common/PostListItem';

interface PostDataItem {
    postId: number;
    postCategory: string;
    postTitle: string;
    postFirstParagraph: string;
    postFirstImage: string;
    likesCounts: number;
    commentsCounts: number;
    hitsCounts: number;
    authorId: number; // 작성자 ID
}

interface MyPostListProps {
    // 로그인한 사용자의 ID
    userId: number;
}

const MyPostList: React.FC<MyPostListProps> = ({ userId }) => {
    const [page, setPage] = useState<number>(1);
    const [postData, setPostData] = useState<PostDataItem[]>([]);
    const limit: number = 5; // 한 페이지에 담길 수 있는 최대 PostListItem

    useEffect(() => {
        // axios를 사용하여 posts.json에서 데이터를 가져옴
        axios.get('/posts.json').then((response) => {
            // 사용자가 작성한 게시글만 필터링
            const userPosts = response.data.postListData.filter(
                (post: PostDataItem) => post.authorId === userId
            );
            setPostData(userPosts);
        });
    }, [userId]);

    const dataArrayLength: number = postData.length;
    const offset: number = (page - 1) * limit;
    const numPages: number = Math.ceil(dataArrayLength / limit);

    const currentPageGroup: number = Math.ceil(page / 5);
    const startPage: number = (currentPageGroup - 1) * 5 + 1;
    const endPage: number = Math.min(currentPageGroup * 5, numPages);

const MyPostList:React.FC = () => {
    return (
        <div>
            나의 게시글
        </div>
    );
};

const PostListComponent = styled.div``;

const PostListItems = styled.div`
    width: 750px;
    height: 875px;
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

export default MyPostList;