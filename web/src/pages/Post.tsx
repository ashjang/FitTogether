import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostContents from '../components/Post/PostContents';
import styled from '@emotion/styled';
import Comments from '../components/Post/Comments';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { postDataRecoil } from '../recoil/posts/atoms';
import { postContentsDataRecoil, conmentsDataRecoil, isLikedState } from '../recoil/posts/atoms';
const Post: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();

    const token = sessionStorage.getItem('token');
    const [postData, setPostData] = useRecoilState(postDataRecoil);
    const [postContentsData, setPostContentsData] = useRecoilState(postContentsDataRecoil);
    const [commentsData, setCommentsData] = useRecoilState(conmentsDataRecoil);
    const setLikeState = useSetRecoilState(isLikedState);

    const getPostData = async () => {
        try {
            console.log(token);
            const response = await axios.get(`/api/posts/${postId}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });

            console.log('response.data: ', response.data);
            setPostData(response.data);

            setPostContentsData({
                ...postContentsData,
                userImage: response.data.userImage,
                userNickname: response.data.userNickname,
                createdAt: response.data.createdAt,
                category: response.data.category,
                hashtagList: response.data.hashtagList,
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
                childReplyList: response.data.childReplyList,
            });
            setLikeState(response.data.like);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (postData.postId === 0) {
            getPostData();
        }
    }, []);

    window.addEventListener('beforeunload', function () {});

    return (
        <PostPage>
            {postData ? <PostContents key={`postId:${postId}`} /> : <div>Loading...</div>}
            <Comments />
        </PostPage>
    );
};

const PostPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 150px auto 0;
    min-height: calc(100vh - 200px);
`;

export default Post;
