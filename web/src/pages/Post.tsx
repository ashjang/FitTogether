import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostContents from '../components/Post/PostContents';
import styled from '@emotion/styled';
import Comments from '../components/Post/Comments';

interface ReplyData {
    postId: number;
    replyId: number;
    userImage: string;
    userNickname: string;
    createdAt: string;
    comment: string;
}

interface ChildReplyData {
    postId: number;
    replyId: number;
    childReplyId: number;
    userImage: string;
    userNickname: string;
    createdAt: string;
    comment: string;
}

interface PostData {
    postId: number;
    userImage: string;
    userNickname: string;
    createdAt: string;
    category: string;
    hashtag: string[];
    title: string;
    description: string;
    likeCount: number;
    replyCount: number;
    viewCount: number;
    replyList: ReplyData[];
    childReplyList: ChildReplyData[];
}

const Post: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [postData, setPostData] = useState<PostData>();
    const [replyData, setReplyData] = useState<ReplyData[]>();
    const [childReplyData, setChildReplyData] = useState<ChildReplyData[]>();

    const getPostData = async () => {
        // const response = await axios.post(`/posts/${postId}`,{postId} , header);
        try {
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
    }, []); // 두 번째 인자로 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

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
                <PostContents key={`postId:${postId}`} {...postData} /> // 첫 번째 게시물 데이터를 PostContents 컴포넌트로 넘겨줌
            ) : (
                <div>Loading...</div>
            )}
            {replyData && replyData.length > 0 && (
                <Comments
                    key={`replyInPostId:${replyData[0].postId}`}
                    replyData={replyData}
                    childReplyData={childReplyData || []}
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
