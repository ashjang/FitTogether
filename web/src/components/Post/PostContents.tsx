import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
import default_user_image from '../../assets/default-user-image.png';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import Modal from 'react-modal';

const imageSrc: string = default_user_image;

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
}

interface PostContentsProps {
    postData: PostData;
    onUpdate: () => void;
}

const PostContents: React.FC<PostContentsProps> = (
    //     {
    //     // postId,
    //     // userImage,
    //     userNickname,
    //     createdAt,
    //     category,
    //     hashtag,
    //     title,
    //     description,
    //     likeCount,
    //     replyCount,
    //     viewCount,
    // }
    props
) => {
    // const { postId } = useParams<{ postId: string }>();
    // const [isLikedState, setIsLikedState] = useState(isliked);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달 토글 함수
    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // 전체 게시글을 보여주는 Community 페이지로 이동하는 함수
    // const handleGoBackToCommunity = () => {
    //     const navigate = useNavigate();
    //     navigate('/community');
    // };

    // 게시글 수정 눌렀을 때 실행할 함수
    const handleEditPost = () => {};

    // 게시글 삭제 눌렀을 때 실행할 함수
    const handleDeletePost = async () => {
        // try {
        //     const response = await axios.delete(`/posts/${postId}`, {
        //         headers,
        //     });
        //     console.log(response.data);
        //     if (response.data.status === 'success') {
        //         handleGoBackToCommunity();
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };

    // 좋아요 눌렀을 때
    const handleToggleLikeButton = async () => {
        // try {
        //     const likeForm = {
        //         like: !isLikedState,
        //     };
        //     const response = await axios.post(`/posts/${postId}/like`, likeForm, {
        //         headers,
        //     });
        //     if (response.data.status === 'success') {
        //         setIsLikedState(!IsLikedState);
        //         props.onUpdate();
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        props.onUpdate();
    };
    return (
        <PostContentsComponent>
            <CategoryAndHashtag>
                <PostCategory>{props.postData.category}</PostCategory>
                {props.postData.hashtag.map((hashtag) => {
                    return <PostHashtag>{hashtag}</PostHashtag>;
                })}
            </CategoryAndHashtag>

            <ProfileContainer>
                <ProfileImageContainer>
                    <ProfileImage src={imageSrc} />
                </ProfileImageContainer>
                <ProfileNickname>{props.postData.userNickname}</ProfileNickname>
                <CreatedAt>{props.postData.createdAt}</CreatedAt>
                {/* ❗해당 포스트의 작성자만 아이콘이 보이도록하는 로직 */}
                <FaEllipsis icon={faEllipsis} onClick={handleToggleModal} />
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
                    <button onClick={handleEditPost}>수정하기</button>
                    <button onClick={handleDeletePost}>삭제하기</button>
                </Modal>
            </ProfileContainer>
            <Post>
                <h1>{props.postData.title}</h1>
                <p>{props.postData.description}</p>
            </Post>
            <PostDetail>
                <PostDetailItem>
                    <FaThumbsUp icon={faThumbsUp} onClick={handleToggleLikeButton} />
                    <span>{props.postData.likeCount}</span>
                </PostDetailItem>
                <PostDetailItem>
                    <FaComment icon={faComment} />
                    <span>{props.postData.replyCount}</span>
                </PostDetailItem>
                <PostDetailItem>
                    <span>조회수: {props.postData.viewCount}</span>
                </PostDetailItem>
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
    width: 850px;
`;

const PostCategory = styled.p`
    margin-right: 15px;
    font-weight: bold;
`;

const PostHashtag = styled.p`
    margin-right: 15px;
`;

const ProfileContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 900px;
`;

const ProfileImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border: 1px transparent solid;
    border-radius: 50%;
    margin: 10px;
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
`;

const FaEllipsis = styled(FontAwesomeIcon)`
    position: absolute;
    margin: 0 30px;
    right: 0px;
`;

const Post = styled.div`
    width: 850px;
`;

const PostDetail = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 850px;
`;

const PostDetailItem = styled.div`
    margin-right: 15px;
`;

const FaThumbsUp = styled(FontAwesomeIcon)``;

const FaComment = styled(FontAwesomeIcon)``;

export default PostContents;
