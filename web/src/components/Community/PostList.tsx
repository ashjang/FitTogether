// /** @jsxImportSource @emotion/react */
// import React, { useState } from "react";
// import { css } from "@emotion/react";
// import PostListItem from "../common/PostListItem";
// import styled from "@emotion/styled";
// import post_image_example from "../../assets/post_image_example.jpg";

// const imageSrc: string = post_image_example;

// interface Props {}

// interface PostDataItem {
//   postCategory: string;
//   postTitle: string;
//   postFirstParagraph: string;
//   postFirstImage: string;
//   likeCount: number;
//   commentCount: number;
//   hitsCount: number;
// }

// const data: PostData = {};

// interface PostData {
//   [key: string]: PostDataItem;
// }

// const postTemplate = {
//   postCategory: "postCategory",
//   postTitle: "postTitle",
//   postFirstParagraph:
//     "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti qui non nesciunt enim possimus eligendi adipisci quas officiis sapiente voluptatem consequatur vitae hic maiores error laborum fuga, corrupti consequuntur architecto. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti qui non nesciunt enim possimus eligendi adipisci quas officiis sapiente voluptatem consequatur vitae hic maiores error laborum fuga, corrupti consequuntur architecto.",
//   postFirstImage: imageSrc,
//   likeCount: 99,
//   commentCount: 20,
//   hitsCount: 500,
// };

// for (let i = 1; i <= 51; i++) {
//   data[`post${i}`] = { ...postTemplate };
// }

// const PostList: React.FC<Props> = () => {
//   const [page, setPage] = useState<number>(1); // 현재 페이지
//   const dataArray: string[] = Object.keys(data); // 데이터 배열
//   const dataArrayLength: number = dataArray.length; // 데이터 배열의 길이. 즉, 총 PostListItem 수
//   const limit: number = 5; // 한 페이지에 담길 수 있는 최대 PostListItem
//   const offset: number = (page - 1) * limit; // 각 페이지의 첫번째 PostlistItem의 Index
//   const numPages: number = Math.ceil(dataArrayLength / limit); // 총 페이지 수

//   const currentPageGroup: number = Math.ceil(page / 5); // 현재 페이지 그룹
//   const startPage: number = (currentPageGroup - 1) * 5 + 1; // 현재 페이지 그룹에서 시작페이지
//   const endPage: number = Math.min(currentPageGroup * 5, numPages); // 현재 페이지 그룹에서 마지막 페이지

//   return (
//     <PostListComponent>
//       <PostListItems>
//         {dataArray.slice(offset, offset + limit).map((key) => (
//           <PostListItem key={key} {...data[key]} />
//         ))}
//         {/* 의문이 있는 코드 */}
//       </PostListItems>
//       <ButtonGroup>
//         <PaginationButton
//           onClick={() => setPage(page - 1)}
//           disabled={page === 1}
//         >
//           &lt;
//         </PaginationButton>
//         {Array.from(
//           { length: endPage - startPage + 1 },
//           (_, index) => startPage + index
//         ).map((item) => (
//           <PaginationButton
//             key={item}
//             onClick={() => setPage(item)}
//             css={item === page ? selectedButton : unselectedButton}
//           >
//             {item}
//           </PaginationButton>
//         ))}
//         <PaginationButton
//           onClick={() => setPage(page + 1)}
//           disabled={page === numPages}
//         >
//           &gt;
//         </PaginationButton>
//       </ButtonGroup>
//     </PostListComponent>
//   );
// };

// const PostListComponent = styled.div``;

// const PostListItems = styled.div`
//   width: 750px;
//   height: 875px;
// `;

// const ButtonGroup = styled.div`
//   width: max-content;
//   margin: 0 auto;
// `;

// const PaginationButton = styled.button`
//   width: 25px;
// `;

// const unselectedButton = css``;

// const selectedButton = css`
//   font-weight: bold;
// `;

// export default PostList;

// PostList.tsx
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import PostListItem from "../common/PostListItem";
import styled from "@emotion/styled";
import axios from "axios";

interface PostDataItem {
  postId: number;
  postCategory: string;
  postTitle: string;
  postFirstParagraph: string;
  postFirstImage: string;
  likesCounts: number;
  commentsCounts: number;
  hitsCounts: number;
}

const PostList: React.FC = () => {
  const [page, setPage] = useState<number>(1); // 현재 페이지
  const [postData, setPostData] = useState<PostDataItem[]>([]); // 게시글 데이터
  const limit: number = 5; // 한 페이지에 담길 수 있는 최대 PostListItem

  useEffect(() => {
    // axios를 사용하여 posts.json에서 데이터를 가져옴
    axios.get("/posts.json").then((response) => {
      setPostData(response.data.postListData);
    });
  }, []);

  const dataArrayLength: number = postData.length; // 데이터 배열의 길이. 즉, 총 PostListItem 수
  const offset: number = (page - 1) * limit; // 각 페이지의 첫번째 PostlistItem의 Index
  const numPages: number = Math.ceil(dataArrayLength / limit); // 총 페이지 수

  const currentPageGroup: number = Math.ceil(page / 5); // 현재 페이지 그룹
  const startPage: number = (currentPageGroup - 1) * 5 + 1; // 현재 페이지 그룹에서 시작페이지
  const endPage: number = Math.min(currentPageGroup * 5, numPages); // 현재 페이지 그룹에서 마지막 페이지

  return (
    <PostListComponent>
      <PostListItems>
        {postData.slice(offset, offset + limit).map((post) => (
          <PostListItem key={post.postId} {...post} />
        ))}
      </PostListItems>
      <ButtonGroup>
        <PaginationButton
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </PaginationButton>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((item) => (
          <PaginationButton
            key={item}
            onClick={() => setPage(item)}
            css={item === page ? selectedButton : unselectedButton}
          >
            {item}
          </PaginationButton>
        ))}
        <PaginationButton
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          &gt;
        </PaginationButton>
      </ButtonGroup>
    </PostListComponent>
  );
};

const PostListComponent = styled.div``;

const PostListItems = styled.div`
  width: 750px;
  height: 875px;
`;

const ButtonGroup = styled.div`
  width: max-content;
  margin: 0 auto;
`;

const PaginationButton = styled.button`
  width: 25px;
`;

const unselectedButton = css``;

const selectedButton = css`
  font-weight: bold;
`;

export default PostList;
