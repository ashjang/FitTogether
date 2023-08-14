import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostContents from '../components/Post/PostContents';
import styled from '@emotion/styled';
import Comments from '../components/Post/Comments';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    postDataRecoil,
    postContentsDataRecoil,
    conmentsDataRecoil,
    isLikedState,
} from '../recoil/posts/atoms';

const Post: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();

    const [postData, setPostData] = useRecoilState(postDataRecoil);
    const [postContentsData, setPostContentsData] = useRecoilState(postContentsDataRecoil);
    const [commentsData, setCommentsData] = useRecoilState(conmentsDataRecoil);
    const setLikeState = useSetRecoilState(isLikedState);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (token) {
            getPostData(token);
        }
        console.log('Post Rendering !');
    }, []);

    const getPostData = async (token: string | null) => {
        try {
            console.log(token);
            const response = await axios.get(`/api/posts/${postId}`, {
                // headers: {
                //     'X-AUTH-TOKEN': token,
                // },
            });
            setPostData(response.data);
            console.log(postData);
            setPostContentsData({
                ...postContentsData,
                userImage: response.data.userImage,
                userNickname: response.data.userNickname,
                createdAt: response.data.createdAt,
                category: response.data.category,
                hashtag: response.data.hashtag,
                title: response.data.title,
                description: response.data.description,
                likeCount: response.data.likeCount,
                replyCount: response.data.replyCount,
                viewCount: response.data.viewCount,
                like: response.data.like,
                accessLevel: response.data.accessLevel,
            });
            setCommentsData({
                ...commentsData,
                replyList: response.data.replyList,
                childReplyList: response.data.replyList,
            });
            setLikeState(response.data.like);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Page>
            {postData ? <PostContents key={`postId:${postId}`} /> : <div>Loading...</div>}
            {commentsData && commentsData.replyList.length > 0 && (
                <Comments key={`replyInPostId:${commentsData.replyList[0].postId}`} />
            )}
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 150px auto;
    min-height: calc(100vh - 300px);
`;

export default Post;
