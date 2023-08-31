import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostContents from '../components/Post/PostContents';
import styled from '@emotion/styled';
import Comments from '../components/Post/Comments';
import { useRecoilValue } from 'recoil';
import { postDataRecoil } from '../recoil/posts/atoms';

const Post: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const postData = useRecoilValue(postDataRecoil);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Page>
            {postData ? <PostContents key={`postId:${postId}`} /> : <div>Loading...</div>}
            <Comments />
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 150px auto;
    min-height: calc(100vh - 200px);
`;

export default Post;
