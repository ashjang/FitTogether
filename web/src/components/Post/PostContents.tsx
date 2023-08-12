import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import default_user_image from '../../assets/default-user-image.png';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
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
    accessLevel: boolean;
    images: string[];
}

interface DataForEdit {
    savedTitle: string;
    savedDescription: string;
    savedImages: string[];
    savedHashtag: string[];
    savedCategory: string;
    savedAccessLevel: boolean;
}

interface PostContentsProps {
    postData: PostData;
    onUpdate: () => void;
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
    const dateObject = new Date(createdAt);

    const formattedDate = dateObject.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    return formattedDate;
};

const PostContents: React.FC<PostContentsProps> = (props) => {
    const { postId } = useParams<{ postId: string }>();
    // const [isLikedState, setIsLikedState] = useState(isliked);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dataForEdit: DataForEdit = {
        savedTitle: props.postData.title,
        savedDescription: props.postData.description,
        savedImages: props.postData.images,
        savedHashtag: props.postData.hashtag,
        savedCategory: props.postData.category,
        savedAccessLevel: props.postData.accessLevel,
    };

    // 모달 토글 함수
    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // 전체 게시글을 보여주는 posts 페이지로 이동하는 함수
    // const handleGoBackToPosts = () => {
    //     const navigate = useNavigate();
    //     navigate('/posts');
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
        //         handleGoBackToPosts();
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
                <PostCategory>{getCategoryName(props.postData.category)}</PostCategory>
                {props.postData.hashtag &&
                    props.postData.hashtag.map((hashtag) => {
                        return <PostHashtag>{hashtag}</PostHashtag>;
                    })}
            </CategoryAndHashtag>

            <ProfileContainer>
                <ProfileImageContainer>
                    <ProfileImage src={imageSrc} />
                </ProfileImageContainer>
                <ProfileNickname>{props.postData.userNickname}</ProfileNickname>
                <CreatedAt>{formatDateString(props.postData.createdAt)}</CreatedAt>
                {/* ❗ 해당 포스트의 작성자만 아이콘이 보이도록하는 로직 */}
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
                    <Link to={`/posts/${postId}/editpost`} state={{ dataForEdit }}>
                        <button onClick={handleEditPost}>수정하기</button>
                    </Link>
                    <button onClick={handleDeletePost}>삭제하기</button>
                </Modal>
            </ProfileContainer>
            <Post>
                <PostTitle>{props.postData.title}</PostTitle>
                <PostDescription dangerouslySetInnerHTML={{ __html: props.postData.description }} />
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
                    <FaEye icon={faEye} />
                    <span>{props.postData.viewCount}</span>
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
    justify-contents: flex-start;
    align-items: center;
    width: 850px;
`;

const PostCategory = styled.p`
    padding: 0 10px;
    margin-right: 20px;
    border-radius: 7.5px;
    background-color: #c7c7c7;
`;

const PostHashtag = styled.p`
    padding: 0 10px;
    margin-right: 15px;
    border-radius: 15px;
    background-color: #e1e1e1;
    font-size: 13px;
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
`;

const FaEllipsis = styled(FontAwesomeIcon)`
    position: absolute;
    margin: 0 30px;
    right: 0px;
`;

const Post = styled.div`
    width: 850px;
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

const PostDetailItem = styled.div`
    margin-right: 20px;
`;

const FaThumbsUp = styled(FontAwesomeIcon)`
    margin-left: 10px;
    margin-right: 5px;
`;

const FaComment = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const FaEye = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

export default PostContents;
