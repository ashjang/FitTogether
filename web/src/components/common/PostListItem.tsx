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
    hashtags: string[];
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
    hashtags,
    title,
    // userImage,
    userNickname,
    likeCount,
    viewCount,
}) => {
    return (
        <PostListItemComponent>
            <ShowPost to={`/posts/${postId}`}>
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
    width: 1000px;
    border-top: 1px solid #d7d7d7;
    padding: 15px 0;
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
