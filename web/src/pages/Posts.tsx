import React from 'react';
import { Link } from 'react-router-dom';
import PostFilter from '../components/Posts/PostFilter';
import PostList from '../components/Posts/PostList';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { loggedInState } from '../recoil/AuthState/atoms';

const Posts: React.FC = () => {
    const loggedIn = useRecoilValue(loggedInState);

    return (
        <Page>
            <Title>커뮤니티</Title>
            <PostFilter />
            <PostList />
            {/* 로그인된 상태여야만 게시글 작성 버튼이 렌더링 */}
            {loggedIn && (
                <Link to="/posts/createpost">
                    <NewPost>게시글 작성</NewPost>
                </Link>
            )}
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 120px auto 0;
    padding: 20px;
    width: 1000px;
    min-height: calc(100vh - 200px);
`;

const Title = styled.h2`
    position: relative;
    width: 1000px;
    margin-bottom: 50px;
`;

const NewPost = styled.button`
    position: absolute;
    right: 0px;
    bottom: 0px;
    padding: 0 10px;
    border-style: none;
    border-radius: 15px;
    background-color: #d7d7d7;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
    &: hover {
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
    }
`;

export default Posts;
