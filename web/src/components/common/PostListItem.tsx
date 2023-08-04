import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import imgSrc from '../../assets/post_image_example.jpg';

interface Props {
    postId: number;
    category: string;
    title: string;
    firstParagraph: string;
    firstImage: string;
    likeCount: number;
    replyCount: number;
    viewCount: number;
}
const PostListItem: React.FC<Props> = ({
    postId,
    category,
    title,
    firstParagraph,
    // firstImage, // json-server에서 이미지 경로를 가져와 사용하는 것이 까다로워 임시로 import하여 사용
    likeCount,
    replyCount,
    viewCount,
}) => {
    return (
        <PostListItemComponent>
            {/* ShowPost: postId를 사용하여 해당 postId를 가진 post의 내용을 불러와 렌더링하도록 수정해야!! */}
            <ShowPost to={`/community/${postId}`}>
                <PostInfo>
                    <PostCategory>{category}</PostCategory>
                    <PostTitle>{title}</PostTitle>
                    <PostFirstParagraph>{firstParagraph}</PostFirstParagraph>
                    <PostDetail>
                        <PostDetailItem>
                            <FaThumbsUp icon={faThumbsUp} />
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
                </PostInfo>
                <PostImageContainer>
                    <PostImage src={imgSrc} />
                </PostImageContainer>
            </ShowPost>
        </PostListItemComponent>
    );
};

const PostListItemComponent = styled.div`
    width: 750px;
    height: 150px;
    margin: 25px 0;
`;

const ShowPost = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 150px;
`;

const PostCategory = styled.p`
    height: 25px;
`;
const PostTitle = styled.h2`
    height: 30px;
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
const PostFirstParagraph = styled.p`
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 1.2;
    height: 70px;
    color: #444;
    text-decoration: none;
`;

const PostDetail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PostDetailItem = styled.div`
    margin-right: 15px;
`;

const FaThumbsUp = styled(FontAwesomeIcon)``;

const FaComment = styled(FontAwesomeIcon)``;

const PostImageContainer = styled.div`
    width: 150px;
    height: 150px;
`;

const PostImage = styled.img`
    display: block;
    padding: 0px;
    width: 150px;
    height: 150px;
`;
export default PostListItem;
