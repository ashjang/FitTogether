import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

interface Props {
  postCategory: string;
  postTitle: string;
  postFirstParagraph: string;
  likeCount: number;
  commentCount: number;
  hitsCount: number;
  postFirstImage: string;
}

const PostListItem: React.FC<Props> = ({
  postCategory,
  postTitle,
  postFirstParagraph,
  likeCount,
  commentCount,
  hitsCount,
  postFirstImage,
}) => {
  return (
    <PostListItemComponent>
      <PostInfo>
        <PostCategory>{postCategory}</PostCategory>
        <PostTitle>{postTitle}</PostTitle>
        <PostFirstParagraph>{postFirstParagraph}</PostFirstParagraph>
        <PostDetail>
          <PostDetailItem>
            <FaThumbsUp icon={faThumbsUp} />
            <span>{likeCount}</span>
          </PostDetailItem>
          <PostDetailItem>
            <FaComment icon={faComment} />
            <span>{commentCount}</span>
          </PostDetailItem>
          <PostDetailItem>
            <span>조회수: {hitsCount}</span>
          </PostDetailItem>
        </PostDetail>
      </PostInfo>
      <PostImageContainer>
        <PostImage src={postFirstImage} />
      </PostImageContainer>
    </PostListItemComponent>
  );
};

const PostListItemComponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 750px;
  height: 150px;
  margin: 25px 0;
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
