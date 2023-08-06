import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostContents from '../components/Post/PostContents';
import styled from '@emotion/styled';
import Comments from '../components/Post/Comments';
import { useRecoilState } from 'recoil';
import { postDataState, replyDataState, childReplyDataState } from '../recoil/community/atoms';

const Post: React.FC = () => {
    const [update, setUpdate] = useState<boolean>(false);

    const { postId } = useParams<{ postId: string }>();

    const [postData, setPostData] = useRecoilState(postDataState);
    const [replyData, setReplyData] = useRecoilState(replyDataState);
    const [childReplyData, setChildReplyData] = useRecoilState(childReplyDataState);

    const getPostData = async () => {
        // const response = await axios.post(`/posts/${postId}`,{postId} , header);
        try {
            console.log(postId);
            const response = await axios.get(`http://localhost:3001/posts-${postId}`);
            const { replyList, childReplyList, ...rest } = response.data;
            setPostData(rest);
            setReplyData(replyList);
            setChildReplyData(childReplyList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPostData();
        console.log('Post Rendering !');
    }, [update]); // 두 번째 인자로 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

    useEffect(() => {
        console.log(postData);
    }, [postData]);

    useEffect(() => {
        console.log(replyData);
    }, [replyData]);

    useEffect(() => {
        console.log(childReplyData);
    }, [childReplyData]);

    return (
        <Page>
            {postData ? (
                <PostContents
                    key={`postId:${postId}`}
                    postData={postData}
                    onUpdate={() => setUpdate(!update)}
                />
            ) : (
                <div>Loading...</div>
            )}
            {replyData && replyData.length > 0 && (
                <Comments
                    key={`replyInPostId:${replyData[0].postId}`}
                    replyData={replyData}
                    childReplyData={childReplyData || []}
                    onUpdate={() => setUpdate(!update)}
                />
            )}
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    // min-height는 삭제 예정
    min-height: calc(100vh - 300px);
`;

export default Post;
