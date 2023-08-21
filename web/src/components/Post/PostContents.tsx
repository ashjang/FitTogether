import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import default_user_image from '../../assets/default-user-image.png';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import Modal from 'react-modal';
import { useRecoilValue, useRecoilState } from 'recoil';
import { signInInfo } from '../../recoil/AuthState/atoms';
import { postDataRecoil, postContentsDataRecoil, isLikedState } from '../../recoil/posts/atoms';

const imageSrc: string = default_user_image;

interface DataForEdit {
    savedTitle: string;
    savedDescription: string;
    savedImages: string[];
    savedHashtagList: string[];
    savedCategory: string;
    savedAccessLevel: boolean;
}

interface PostDetailLikeProps {
    active: boolean;
}

const getCategoryName = (categoryEng: string) => {
    switch (categoryEng) {
        case 'RUNNING':
            return '러닝';
        case 'HIKING':
            return '등산';
        case 'WEIGHT':
            return '헬스';
        default:
            return '';
    }
};

const formatDateString = (createdAt: string) => {
    if (!createdAt) {
        return '';
    }

    const dateObject = new Date(createdAt);

    const formattedDate = dateObject.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24-hour format
    });

    const [date, time] = formattedDate.split(', ');
    const [month, day, year] = date.split('/');
    const [hour, minute] = time.split(':');

    return `${year}/${month}/${day} ${hour}:${minute}`;
};

const PostContents: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const [postData, setPostData] = useRecoilState(postDataRecoil);
    const [postContentsData, setPostContentsData] = useRecoilState(postContentsDataRecoil);
    console.log('postContentsData', postContentsData);
    const [likeState, setLikeState] = useRecoilState(isLikedState);

    const myInfo = useRecoilValue(signInInfo);

    const { postId } = useParams<{ postId: string }>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const dataForEdit: DataForEdit = {
        savedTitle: postData.title,
        savedDescription: postData.description,
        savedImages: postData.images,
        savedHashtagList: postData.hashtagList,
        savedCategory: postData.category,
        savedAccessLevel: postData.accessLevel,
    };

    // 모달 토글 함수
    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // 전체 게시글을 보여주는 posts 페이지로 이동하는 함수
    const handleGoBackToPosts = () => {
        navigate('/posts');
    };

    // 게시글 삭제 눌렀을 때 실행할 함수
    const handleDeletePost = async () => {
        try {
            console.log(token);
            const response = await axios.delete(`/api/posts/${postId}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log(response.data);
            if (response.status === 200) {
                handleGoBackToPosts();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 좋아요 눌렀을 때 실행할 함수
    const handleToggleLikeButton = async () => {
        try {
            console.log(token);
            const response = await axios.post(`/api/posts/${postId}/like`, null, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            setPostData({
                ...postData,
                like: response.data.like,
                likeCount: response.data.likeCount,
            });
            setPostContentsData({
                ...postContentsData,
                like: response.data.like,
                likeCount: response.data.likeCount,
            });
            console.log(response.data);
            console.log('postContentsData by like', postContentsData);
            setLikeState(response.data.like);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <PostContentsComponent>
            <CategoryAndHashtag>
                <PostCategory>{getCategoryName(postContentsData.category)}</PostCategory>
                {postContentsData.hashtagList &&
                    postContentsData.hashtagList.map((hashtag) => {
                        return <PostHashtag>#{hashtag}</PostHashtag>;
                    })}
            </CategoryAndHashtag>

            <ProfileContainer>
                <ProfileImageContainer>
                    <ProfileImage src={imageSrc} />
                </ProfileImageContainer>

                <ProfileNickname>{postContentsData.userNickname}</ProfileNickname>
                <CreatedAt>{formatDateString(postContentsData.createdAt)}</CreatedAt>
                {myInfo.nickname === postContentsData.userNickname && (
                    <FaEllipsis icon={faEllipsis} onClick={handleToggleModal} />
                )}

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={handleToggleModal}
                    contentLabel="Example Modal"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        },
                        content: {
                            width: 'max-content',
                            height: 'max-content',
                            margin: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: 'none',
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <Link to={`/posts/${postId}/editpost`} state={{ dataForEdit }}>
                        <ModalButtonEdit>수정</ModalButtonEdit>
                    </Link>
                    <ModalButtonDelete onClick={handleDeletePost}>삭제</ModalButtonDelete>
                </Modal>
            </ProfileContainer>
            <Post>
                <PostTitle>{postContentsData.title}</PostTitle>
                <PostDescription
                    dangerouslySetInnerHTML={{ __html: postContentsData.description }}
                />
            </Post>
            <PostDetail>
                <PostDetailLike active={likeState === true} onClick={handleToggleLikeButton}>
                    <FaThumbsUp icon={faThumbsUp} />
                    <LikeCount>{postContentsData.likeCount}</LikeCount>
                </PostDetailLike>
                <PostDetailReply>
                    <FaComment icon={faComment} />
                    <ReplyCount>{postContentsData.replyCount}</ReplyCount>
                </PostDetailReply>
                <PostDetailView>
                    <FaEye icon={faEye} />
                    <ViewCount>{postContentsData.viewCount}</ViewCount>
                </PostDetailView>
            </PostDetail>
        </PostContentsComponent>
    );
};

const PostContentsComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const CategoryAndHashtag = styled.div`
    display: flex;
    justify-contents: flex-start;
    align-items: center;
    width: 850px;
`;

const PostCategory = styled.p`
    padding: 0 10px;
    margin-right: 20px;
    border-radius: 15px;
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

const ProfileContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 850px;
`;

const ProfileImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border: 1px transparent solid;
    border-radius: 50%;
    margin: 20px 10px 20px 0;
    overflow: hidden;
`;

const ProfileImage = styled.img`
    display: block;
    padding: 0px;
    width: 35px;
    height: 35px;
`;

const ProfileNickname = styled.p`
    font-size: 16px;
    font-weight: bold;
`;

const CreatedAt = styled.p`
    position: absolute;
    right: 100px;
    font-size: 10px;
`;

const FaEllipsis = styled(FontAwesomeIcon)`
    position: absolute;
    margin: 0 30px;
    right: 0px;
`;

const ModalButtonEdit = styled.button`
    padding: 0 10px;
    border-style: none;
    border-radius: 15px;
    margin: 5px;
    background-color: #d7d7d7;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
    &: hover {
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
    }
`;

const ModalButtonDelete = styled.button`
    padding: 0 10px;
    border-style: none;
    border-radius: 15px;
    margin: 5px;
    background-color: #dc9696;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
    &: hover {
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
    }
`;

const Post = styled.div`
    width: 850px;
`;

const PostTitle = styled.h1`
    margin-bottom: 20px;
`;

const PostDescription = styled.div`
    width: 850px;
    min-height: 300px;
`;

const PostDetail = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 850px;
    margin-top: 30px;
    border-top: 1px solid #d7d7d7;
    border-bottom: 1px solid #d7d7d7;
`;

const PostDetailLike = styled.div<PostDetailLikeProps>`
    margin-right: 10px;
    border-radius: 10px;
    background-color: ${(props) => (props.active ? '#a1c9e4' : 'transparent')};
    font-weight: ${(props) => (props.active ? 'bold' : 'regular')};
`;

const FaThumbsUp = styled(FontAwesomeIcon)`
    margin-left: 12px;
    margin-right: 5px;
`;

const LikeCount = styled.span`
    margin-right: 10px;
`;

const PostDetailReply = styled.div`
    margin-right: 10px;
`;

const FaComment = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const ReplyCount = styled.span`
    margin-right: 10px;
`;

const PostDetailView = styled.div`
    margin-right: 10px;
`;

const FaEye = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const ViewCount = styled.span`
    margin-right: 10px;
`;

export default PostContents;
