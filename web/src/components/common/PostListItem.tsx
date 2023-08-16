import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import imgSrc from '../../assets/default-user-image.png';

interface Props {
    postId: number;
    category: string;
    title: string;
    likeCount: number;
    viewCount: number;
    userNickname: string;
    userImage: string;
}

const getCategoryName = (categoryEng: string) => {
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
    title,
    userNickname,
    // userImage,
    likeCount,
    viewCount,
}) => {
    return (
        <PostListItemComponent>
            <ShowPost to={`/posts/${postId}`}>
                <PostInfo>
                    <PostCategory>{getCategoryName(category)}</PostCategory>
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
                        {/* <ProfileImage src={userImage} /> */}
                        <ProfileImage src={imgSrc} />
                    </ProfileImageContainer>
                    <PosterNickname>{userNickname}</PosterNickname>
                </PosterInfo>
            </ShowPost>
        </PostListItemComponent>
    );
};

const PostListItemComponent = styled.div`
    width: 750px;
    margin: 50px 0;
    border-top: 1px solid #d7d7d7;
    padding: 5px 0;
    border-bottom: 1px solid #d7d7d7;
`;

const ShowPost = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const PostCategory = styled.p`
    padding: 3px 5px;
    margin-right: 20px;
    border-radius: 15px;
    font-size: 12px;
    background-color: #c7c7c7;
`;
const PostTitle = styled.h2`
    height: 30px;
    margin: 15px 0;
    font-size: 18px;
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
    justify-content: center;
    align-items: center;
    width: 200px;
`;

const ProfileImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border: 1px transparent solid;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
`;

const ProfileImage = styled.img`
    display: block;
    padding: 0px;
    width: 25px;
    height: 25px;
`;

const PosterNickname = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
`;

export default PostListItem;
