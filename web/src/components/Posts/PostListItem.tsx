import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import imgSrc from '../../assets/default-user-image.png';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    postDataRecoil,
    postContentsDataRecoil,
    conmentsDataRecoil,
    isLikedState,
} from '../../recoil/posts/atoms';
import { loggedInState } from '../../recoil/AuthState/atoms';

interface Props {
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

const PostListItem: React.FC<Props> = ({
    postId,
    category,
    hashtags,
    title,
    userImage,
    userNickname,
    likeCount,
    viewCount,
}) => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(loggedInState);
    const setPostData = useSetRecoilState(postDataRecoil);
    const [postContentsData, setPostContentsData] = useRecoilState(postContentsDataRecoil);
    const [commentsData, setCommentsData] = useRecoilState(conmentsDataRecoil);
    const setLikeState = useSetRecoilState(isLikedState);

    // 게시글 정보를 가져오는 함수 (API: clickPost)
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

            if (response.data.accessLevel === false && isLoggedIn === false) {
                alert('메이트만 볼 수 있는 게시글입니다.');
                return;
            }
            navigate(`/posts/${postId}`);
        } catch (error) {
            console.error(error);
            navigate(`/posts`);
            alert('메이트만 볼 수 있는 게시글입니다.');
        }
    };

    return (
        <PostListItemComponent>
            <ShowPost onClick={getPostData}>
                <PostInfo>
                    <CategoryAndHashtag>
                        <PostCategory>{getCategoryName(category)}</PostCategory>
                        {hashtags?.map((hashtag) => {
                            return <PostHashtag>#{hashtag}</PostHashtag>;
                        })}
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
    padding: 3px 8px 3px 9px;
    margin-right: 20px;
    border-radius: 15px;
    font-size: 14px;
    background-color: #c7c7c7;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
`;

const PostHashtag = styled.p`
    padding: 0 7px;
    margin-right: 15px;
    border-radius: 5px;
    background-color: #a1c9e4;
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
    border: 1px transparent solid;
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
