import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import PostContents from '../components/Post/PostContents';
import Comments from '../components/Post/Comments';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    postDataRecoil,
    postContentsDataRecoil,
    conmentsDataRecoil,
    isLikedState,
} from '../recoil/posts/atoms';

const Post: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const { postId } = useParams<{ postId: string }>();
    const { pathname } = useLocation();
    const [postData, setPostData] = useRecoilState(postDataRecoil);
    const [postContentsData, setPostContentsData] = useRecoilState(postContentsDataRecoil);
    const [commentsData, setCommentsData] = useRecoilState(conmentsDataRecoil);
    const setLikeState = useSetRecoilState(isLikedState);

    // 게시글 정보를 가져오는 함수 (API: clickPost)
    const getPostData = async () => {
        try {
            const response = await axios.get(`/api/posts/${postId}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log('response.data: ', response.data);

            // 반환받은 게시글 정보 전체를 상태에 저장
            setPostData(response.data);
            // PostContents 컴포넌트에서 사용되는 상태 저장
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
            // Comments 컴포넌트에서 사용되는 상태 저장
            setCommentsData({
                ...commentsData,
                replyList: response.data.replyList,
                childReplyList: response.data.childReplyList,
            });
            // 좋아요 상태 저장
            setLikeState(response.data.like);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // 페이지 최상단으로 이동
        window.scrollTo(0, 0);
        // 새로고침 시 postData가 초기화되어 빈 게시글이 뜨는 것 방지하기 위한 조건문
        if (postData.postId === 0) {
            getPostData();
        }
    }, []);

    // 수정 완료 후 수정된 내용을 바로 렌더링하기 위한 useEffect
    useEffect(() => {
        getPostData();
    }, [pathname]);

    return (
        <PostPage>
            <PostContents key={`postId:${postId}`} />
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
