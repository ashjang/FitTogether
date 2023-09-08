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
import { getCategoryName } from '../Posts/PostListItem';

const imgSrc: string = default_user_image;

// '게시글 수정' 눌렀을 때 해당 컴포넌트로 전달할 데이터의 타입
interface DataForEdit {
    savedTitle: string;
    savedDescription: string;
    savedImages: string[];
    savedHashtagList: string[];
    savedCategory: string;
    savedAccessLevel: boolean;
}

// Date를 문자열로 변환하는 함수
export const formatDateString = (createdAt: string) => {
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
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postData, setPostData] = useRecoilState(postDataRecoil);
    const [postContentsData, setPostContentsData] = useRecoilState(postContentsDataRecoil);
    const [likeState, setLikeState] = useRecoilState(isLikedState);
    const myInfo = useRecoilValue(signInInfo);

    // '게시글 수정' 눌렀을 때 해당 컴포넌트로 전달할 데이터
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

    // 게시글 삭제 눌렀을 때 실행할 함수 (API: deletePost)
    const handleDeletePost = async () => {
        try {
            const response = await axios.delete(`/api/posts/${postId}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log(response.data);

            // 성공 시 전체 게시글을 보여주는 페이지 렌더링
            if (response.status === 200) {
                navigate('/posts');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 좋아요 눌렀을 때 실행할 함수 (API: likePost)
    const handleToggleLikeButton = async () => {
        try {
            const response = await axios.post(`/api/posts/${postId}/like`, null, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log(response.data);

            // 기존 데이터에서 좋아요 관련 key만 업데이트
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

            // 좋아요 상태 업데이트
            setLikeState(response.data.like);
        } catch (error) {
            console.error(error);
            alert('로그인이 필요합니다.');
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
                    <ProfileImage
                        src={postContentsData.userImage ? postContentsData.userImage : imgSrc}
                    />
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
                            zIndex: 99,
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
                        <ModalButtonEdit>수정하기</ModalButtonEdit>
                    </Link>
                    <ModalButtonDelete onClick={handleDeletePost}>삭제하기</ModalButtonDelete>
                </Modal>
            </ProfileContainer>
            <Post>
                <PostTitle>{postContentsData.title}</PostTitle>
                {/* dangerouslySetInnerHTML 속성을 통해 HTML 문자열을 렌더링, img 태그는 영역을 벗어나지 않도록 설정 */}
                <PostDescription
                    dangerouslySetInnerHTML={{
                        __html: postContentsData.description.replace(
                            /<img /g,
                            '<img style="max-width: 100%; height: auto;" '
                        ),
                    }}
                />
            </Post>
            <PostDetail>
                <PostDetailLike
                    className={likeState ? 'active' : ''}
                    onClick={handleToggleLikeButton}
                >
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
    padding: 5px 8px 0px 10px;
    margin-right: 20px;
    border-radius: 15px;
    font-size: 15px;
    background-color: #d7d7d7;
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
    font-size: 20px;
    font-weight: bold;
`;

const CreatedAt = styled.p`
    position: absolute;
    right: 30px;
    font-size: 14px;
`;

const FaEllipsis = styled(FontAwesomeIcon)`
    position: absolute;
    right: 0px;
`;

const ModalButtonEdit = styled.button`
    width: 120px;
    height: 50px;
    padding: 0 10px;
    border-style: none;
    border-radius: 15px;
    margin: 5px;
    font-size: 20px;
    background-color: #d7d7d7;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
    &: hover {
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
    }
`;

const ModalButtonDelete = styled.button`
    width: 120px;
    height: 50px;
    padding: 0 10px;
    border-style: none;
    border-radius: 15px;
    margin: 5px;
    font-size: 20px;
    background-color: #dc9696;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
    &: hover {
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
    }
`;

const Post = styled.div`
    width: 850px;
    min-height: 150px;
    margin-bottom: 50px;
`;

const PostTitle = styled.h1`
    margin-bottom: 20px;
`;

const PostDescription = styled.div`
    width: 850px;
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

const PostDetailLike = styled.div`
    margin-right: 10px;
    border-radius: 10px;
    font-weight: regular;
    background-color: transparent;
    &.active {
        font-weight: bold;
        background-color: #a1c9e4;
    }
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
