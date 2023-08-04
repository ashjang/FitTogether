import React from 'react';
import { Link } from 'react-router-dom';
import PostFilter from '../components/Community/PostFilter';
import PostList from '../components/Community/PostList';
import styled from '@emotion/styled';

const Community: React.FC = () => {
    return (
        <Page>
            <Title>커뮤니티</Title>
            <PostFilter />
            <PostList />
            <Link to="/community/createpost">
                <NewPost>게시글 작성</NewPost>
            </Link>
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 750px;
    margin: 0 auto;
    // // min-height는 삭제 예정
    // min-height: calc(100vh - 300px);
`;

const Title = styled.h1`
    width: 750px;
`;

const NewPost = styled.button`
    position: absolute;
    right: 0px;
    bottom: 0px;
`;

export default Community;
