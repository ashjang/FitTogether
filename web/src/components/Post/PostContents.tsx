import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
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

const PostContents: React.FC<PostData> = ({
    // postId,
    // userImage,
    userNickname,
    createdAt,
    category,
    hashtag,
    title,
    description,
    likeCount,
    replyCount,
    viewCount,
}) => {
    // const { postId } = useParams<{ postId: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleEditPost = () => {};

    const handleDeletePost = async () => {
        // try {
        //     const response = await axios.delete(`/posts/${postId}`, {
        //         headers,
        //     });
        //     console.log(response.data);
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const handleToggleLikeButton = async () => {
        try {
            // const likeForm = {
            //     like: !isLiked,
            // };
            // const response = await axios.delete(`/posts/${postId}/like`, likeForm, {
            //     headers,
            // });
            setIsLiked(!isLiked);
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <PostContentsComponent>
            <CategoryAndHashtag>
                <PostCategory>{category}</PostCategory>
                {hashtag.map((hashtag) => {
                    return <PostHashtag>{hashtag}</PostHashtag>;
                })}
            </CategoryAndHashtag>

            <ProfileContainer>
                <ProfileImageContainer>
                    <ProfileImage src={imageSrc} />
                </ProfileImageContainer>
                <ProfileNickname>{userNickname}</ProfileNickname>
                <CreatedAt>{createdAt}</CreatedAt>
                {/* 해당 포스트의 작성자만 아이콘이 보이도록하는 로직 추가해야!! */}
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
                <h1>{title}</h1>
                <p>{description}</p>
            </Post>
            <PostDetail>
                <PostDetailItem>
                    <FaThumbsUp icon={faThumbsUp} onClick={handleToggleLikeButton} />
                    <span>{likeCount}</span>
                </PostDetailItem>
                <PostDetailItem>
                    <FaComment icon={faComment} />
                    <span>{replyCount}</span>
                </PostDetailItem>
                <PostDetailItem>
                    <span>조회수: {viewCount}</span>
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

const FaThumbsUp = styled(FontAwesomeIcon)`
    // position: absolute;
    // margin: 0 30px;
    // right: 0px;
`;

const FaComment = styled(FontAwesomeIcon)`
    // position: absolute;
    // margin: 0 30px;
    // right: 0px;
`;

export default PostContents;
