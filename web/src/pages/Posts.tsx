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
    margin: 110px auto 0;
    padding: 20px;
    max-width: 1040px;
    min-height: calc(100vh - 165px);
    overflow: hidden;
`;

const Title = styled.h2`
    position: relative;
    max-width: 1000px;
    margin-bottom: 50px;
`;

const NewPost = styled.button`
    position: absolute;
    right: 20px;
    bottom: 10px;
    padding: 0 10px;
    border-style: none;
    border-radius: 15px;
    background-color: #d7d7d7;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
    &: hover {
        background-color: #a1c9e4;
        box-shadow: 0px 2px 7.5px rgba(0, 0, 0, 0.5);
    }
`;

export default Posts;
