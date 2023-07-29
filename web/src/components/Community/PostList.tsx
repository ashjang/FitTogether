import React from "react";
import { Link } from "react-router-dom";
import PostListItem from "../common/PostListItem";
import styled from "@emotion/styled";
import post_image_example from "../../assets/post_image_example.jpg";

const imageSrc: string = post_image_example;

interface Props {}

interface PostDataItem {
  postCategory: string;
  postTitle: string;
  postFirstParagraph: string;
  likeCount: number;
  commentCount: number;
  hitsCount: number;
  postFirstImage: string;
}

interface PostData {
  [key: string]: PostDataItem;
}

const data: PostData = {
  post1: {
    postCategory: "postCategory",
    postTitle: "postTitle",
    postFirstParagraph:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti qui non nesciunt enim possimus eligendi adipisci quas officiis sapiente voluptatem consequatur vitae hic maiores error laborum fuga, corrupti consequuntur architecto. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti qui non nesciunt enim possimus eligendi adipisci quas officiis sapiente voluptatem consequatur vitae hic maiores error laborum fuga, corrupti consequuntur architecto.",
    likeCount: 99,
    commentCount: 20,
    hitsCount: 500,
    postFirstImage: imageSrc,
  },
  post2: {
    postCategory: "postCategory",
    postTitle: "postTitle",
    postFirstParagraph: "postFirstParagraph",
    likeCount: 99,
    commentCount: 20,
    hitsCount: 500,
    postFirstImage: imageSrc,
  },
  post3: {
    postCategory: "postCategory",
    postTitle: "postTitle",
    postFirstParagraph: "postFirstParagraph",
    likeCount: 99,
    commentCount: 20,
    hitsCount: 500,
    postFirstImage: imageSrc,
  },
  post4: {
    postCategory: "postCategory",
    postTitle: "postTitle",
    postFirstParagraph: "postFirstParagraph",
    likeCount: 99,
    commentCount: 20,
    hitsCount: 500,
    postFirstImage: imageSrc,
  },
  post5: {
    postCategory: "postCategory",
    postTitle: "postTitle",
    postFirstParagraph: "postFirstParagraph",
    likeCount: 99,
    commentCount: 20,
    hitsCount: 500,
    postFirstImage: imageSrc,
  },
  post6: {
    postCategory: "postCategory",
    postTitle: "postTitle",
    postFirstParagraph: "postFirstParagraph",
    likeCount: 99,
    commentCount: 20,
    hitsCount: 500,
    postFirstImage: imageSrc,
  },
  post7: {
    postCategory: "postCategory",
    postTitle: "postTitle",
    postFirstParagraph: "postFirstParagraph",
    likeCount: 99,
    commentCount: 20,
    hitsCount: 500,
    postFirstImage: imageSrc,
  },
  post8: {
    postCategory: "postCategory",
    postTitle: "postTitle",
    postFirstParagraph: "postFirstParagraph",
    likeCount: 99,
    commentCount: 20,
    hitsCount: 500,
    postFirstImage: imageSrc,
  },
  post9: {
    postCategory: "postCategory",
    postTitle: "postTitle",
    postFirstParagraph: "postFirstParagraph",
    likeCount: 99,
    commentCount: 20,
    hitsCount: 500,
    postFirstImage: imageSrc,
  },
  post10: {
    postCategory: "postCategory",
    postTitle: "postTitle",
    postFirstParagraph: "postFirstParagraph",
    likeCount: 99,
    commentCount: 20,
    hitsCount: 500,
    postFirstImage: imageSrc,
  },
};

const PostList: React.FC<Props> = () => {
  return (
    <PostListComponent>
      <Link to="/community/post">
        <PostListItems>
          {Object.entries(data).map(([key, post]) => (
            <PostListItem key={key} {...post} />
          ))}
        </PostListItems>
      </Link>
    </PostListComponent>
  );
};

const PostListComponent = styled.div``;

const PostListItems = styled.div`
  width: 750px;
`;

export default PostList;
