import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import imgSrc from '../../assets/default-user-image.png';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    postDataRecoil,
    postContentsDataRecoil,
    conmentsDataRecoil,
    isLikedState,
} from '../../recoil/posts/atoms';
import { loggedInState } from '../../recoil/AuthState/atoms';

interface PostListItemData {
    postId: number;
    category: string;
    title: string;
    likeCount: number;
    viewCount: number;
    userNickname: string;
    userImage: string;
    hashtags: string[];
    accessLevel: boolean;
}

// 서버에서 넘어온 영문 카테고리명을 한글로 변환하는 함수
export const getCategoryName = (categoryEng: string) => {
    switch (categoryEng) {
        case 'RUNNING':
            return '러닝';
        case 'HIKING':
            return '등산';
        case 'WEIGHT':
            return '헬스';
    }
};

const PostListItem: React.FC<PostListItemData> = ({
    postId,
    category,
    hashtags,
    title,
    userImage,
    userNickname,
    likeCount,
    viewCount,
    accessLevel,
}) => {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(loggedInState);
    const setPostData = useSetRecoilState(postDataRecoil);
    const setPostContentsData = useSetRecoilState(postContentsDataRecoil);
    const setCommentsData = useSetRecoilState(conmentsDataRecoil);
    const setLikeState = useSetRecoilState(isLikedState);

    // 게시글 정보를 가져오는 함수 (API: clickPost)
    const handlePostClick = async () => {
        try {
            // accessLevel이 false인 게시글이고 로그인이 안되어있다면 해당 포스트의 정보를 가져오기 전에 반환
            if (accessLevel === false && isLoggedIn === false) {
                alert('메이트만 볼 수 있는 게시글입니다. 로그인이 필요합니다');
                return;
            }

            // 기존에 보던 게시글 데이터를 없애서 부드러운 렌더링을 가능하게 하는 초기화 작업
            // 포스트 전체 데이터 초기화
            setPostData({
                postId: 0,
                userImage: '',
                userNickname: '',
                createdAt: '',
                category: '',
                hashtagList: [],
                title: '',
                description: '',
                likeCount: 0,
                replyCount: 0,
                viewCount: 0,
                accessLevel: true,
                replyList: [],
                childReplyList: [],
                images: [],
                like: false,
            });
            // PostContents 컴포넌트에서 사용되는 상태 초기화
            setPostContentsData({
                userImage: '',
                userNickname: '',
                createdAt: '',
                category: '',
                hashtagList: [],
                title: '',
                description: '',
                likeCount: 0,
                replyCount: 0,
                viewCount: 0,
                like: false,
                accessLevel: true,
            });
            // Comments 컴포넌트에서 사용되는 상태 저장
            setCommentsData({
                replyList: [],
                childReplyList: [],
            });
            // 좋아요 상태 초기화
            setLikeState(false);

            // 해당 포스트로 이동
            navigate(`/posts/${postId}`);
        } catch (error) {
            console.error(error);
            navigate(`/posts`);
            alert('메이트만 볼 수 있는 게시글입니다. 메이트 관계가 아닙니다!');
        }
    };

    return (
        <PostListItemComponent>
            <ShowPost onClick={handlePostClick}>
                <PostInfo>
                    <CategoryAndHashtag>
                        <PostCategory>{getCategoryName(category)}</PostCategory>
                        {hashtags?.map((hashtag) => {
                            return <PostHashtag key={hashtag}>#{hashtag}</PostHashtag>;
                        })}
                        {accessLevel === false && <MateMark>mate only</MateMark>}
                    </CategoryAndHashtag>
                    <PostTitle>{title}</PostTitle>
                    <PostDetail>
                        <PostDetailItem>
                            <FaThumbsUp icon={faThumbsUp} />
                            <span>{likeCount}</span>
                        </PostDetailItem>
                        <PostDetailItem>
                            <FaEye icon={faEye} />
                            <span>{viewCount}</span>
                        </PostDetailItem>
                    </PostDetail>
                </PostInfo>
                <PosterInfo>
                    <ProfileImageContainer>
                        <ProfileImage src={userImage ? userImage : imgSrc} />
                    </ProfileImageContainer>
                    <PosterNickname>{userNickname}</PosterNickname>
                </PosterInfo>
            </ShowPost>
        </PostListItemComponent>
    );
};

const PostListItemComponent = styled.div`
    width: 1000px;
    border-top: 1px solid #d7d7d7;
    padding: 15px 0;
    border-bottom: 1px solid #d7d7d7;
    cursor: pointer;
`;

const ShowPost = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const CategoryAndHashtag = styled.div`
    display: flex;
    justify-contents: flex-start;
    align-items: center;
`;

const PostCategory = styled.p`
    padding: 5px 8px 0px 10px;
    margin-right: 20px;
    border-radius: 15px;
    font-size: 15px;
    background-color: #d7d7d7;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
`;

const PostHashtag = styled.p`
    padding: 3px 5px 0px;
    margin-right: 15px;
    border-radius: 5px;
    background-color: #a1c9e4;
    font-size: 13px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
`;

const MateMark = styled.p`
    padding: 3px 5px 0px;
    margin-right: 15px;
    border-radius: 5px;
    background-color: #ffd0dd;
    font-size: 13px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
`;

const PostTitle = styled.h2`
    height: 30px;
    margin: 20px 0px 15px;
    font-size: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const PostDetail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PostDetailItem = styled.div`
    margin-right: 15px;
`;

const FaThumbsUp = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const FaEye = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const PosterInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 130px;
`;

const ProfileImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border: 1px solid transparent;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
`;

const ProfileImage = styled.img`
    display: block;
    padding: 0px;
    width: 35px;
    height: 35px;
`;

const PosterNickname = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
`;

export default PostListItem;
