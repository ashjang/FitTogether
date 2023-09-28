import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import PostContents from '../components/Post/PostContents';
import Comments from '../components/Post/Comments';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    postDataRecoil,
    postContentsDataRecoil,
    conmentsDataRecoil,
    isLikedState,
} from '../recoil/posts/atoms';
import { loggedInState } from '../recoil/AuthState/atoms';

const Post: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const { postId } = useParams<{ postId: string }>();

    const isLoggedIn = useRecoilValue(loggedInState);
    const [postData, setPostData] = useRecoilState(postDataRecoil);
    const setPostContentsData = useSetRecoilState(postContentsDataRecoil);
    const setCommentsData = useSetRecoilState(conmentsDataRecoil);
    const setLikeState = useSetRecoilState(isLikedState);

    // 게시글 정보를 가져오는 함수 (API: clickPost)
    const getPostData = async () => {
        try {
            const response = await axios.get(`/api/posts/${postId}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });

            // 반환받은 게시글 정보 전체를 상태에 저장
            setPostData(response.data);
            // PostContents 컴포넌트에서 사용되는 상태 저장
            setPostContentsData({
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
                replyList: response.data.replyList,
                childReplyList: response.data.childReplyList,
            });
            // 좋아요 상태 저장
            setLikeState(response.data.like);
        } catch (error) {
            console.error(error);
            // 데이터를 불러올 수는 없지만 accessLevel이 false임은 알기 때문에 상태 변경
            // postData.accessLevel의 상태는 return문에서 단순 로딩 상태인지 접근 불가인지 판단하기 위해 사용됨
            setPostData({
                ...postData,
                accessLevel: false,
            });
        }
    };

    // 수정 완료 후 수정된 내용을 바로 렌더링하기 위한 useEffect
    useEffect(() => {
        window.scrollTo(0, 0);
        getPostData();
    }, []);

    return (
        <PostPage>
            {/* PostListItem 클릭이 아닌, url을 통해 접근했을 때 요청을 보낼 수 있으므로 추가 조치 */}
            {/* 1. accessLevel이 false이고 동시에 로그인을 안했으면 '로그인X' 메시지 출력 */}
            {/* 2. postId: 0이면 메이트가 아니라서 데이터 요청에 실패한 것이므로 '메이트X' 메시지 출력  */}
            {/* 더 좋은 방법은 요청 시 백엔드에서 막는거지만, 현재는 로그아웃 상태에서 접근이 가능해서 이렇게 처리... */}
            {postData.accessLevel === false && isLoggedIn === false ? (
                <AccessFalseMessage>
                    접근할 수 없는 게시글입니다. 로그인이 필요합니다 😢
                </AccessFalseMessage>
            ) : postData.accessLevel === false && postData.postId === 0 ? (
                <AccessFalseMessage>
                    접근할 수 없는 게시글입니다. 메이트가 아닙니다 😢
                </AccessFalseMessage>
            ) : postData.postId === 0 ? (
                <AccessFalseMessage>Loading...⌛</AccessFalseMessage>
            ) : (
                <div>
                    <PostContents key={`postId:${postId}`} />
                    <Comments />
                </div>
            )}
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
    overflow: hidden;
`;

const AccessFalseMessage = styled.p`
    margin: auto 0;
    font-size: 20px;
`;

export default Post;
