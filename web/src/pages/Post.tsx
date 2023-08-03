import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostContents from '../components/Post/PostContents';
import styled from '@emotion/styled';
import Comments from '../components/Post/Comments';

interface PostData {
    posterImage: string;
    posterNickname: string;
    createdAt: string;
    postCategory: string;
    postHashtag: string[];
    postTitle: string;
    postContents: string;
    likesCounts: number;
    commentsCounts: number;
    hitsCounts: number;
}

const Post: React.FC = () => {
    const [postData, setPostData] = useState<PostData[]>();
    const { postId } = useParams<{ postId: string }>();

    const getPostData = async () => {
        // const response = await axios.get(`/posts/${postId}`); // 실제로는 이렇게 요청해야
        try {
            const response = await axios.get(`http://localhost:3001/postId${postId}`);
            console.log(response.data);
            setPostData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPostData();
    }, []);

    return (
        <Page>
            {postData && postData.length > 0 ? (
                <PostContents {...postData[0]} /> // 첫 번째 게시물 데이터를 PostContents 컴포넌트로 넘겨줌
            ) : (
                <div>Loading...</div> // 데이터가 없을 때 로딩 메시지를 렌더링
            )}
            <Comments />
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
