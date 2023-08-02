import React from 'react';
import PostContents from '../components/Post/PostContents';
import styled from '@emotion/styled';
import Comments from '../components/Post/Comments';

interface Props {}

const Post: React.FC<Props> = () => {
    return (
        <Page>
            <PostContents />
            <Comments />
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // min-height는 삭제 예정
    min-height: calc(100vh - 300px);
`;

export default Post;
