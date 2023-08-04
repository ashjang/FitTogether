import React, { useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";

interface Props {}

const PostFilter: React.FC<Props> = () => {
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [align, setAlign] = useState("최신순");

  // 검색으로 필터링
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  const handleKeywordSubmit = async () => {
    // 서버에게 'keyword'로 필터링된 데이터 요청
    await fetchData(category, keyword, hashtag, align);
  };

  // 해시태그로 필터링
  const handleHashtagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(event.target.value);
  };
  const handleHashtagSubmit = async () => {
    // 서버에게 'hashtag'로 필터링된 데이터 요청
    await fetchData(category, keyword, hashtag, align);
  };

  // 카테고리로 필터링
  const handleCategoryClick = async (newCategory: string) => {
    // 이전 선택과 다른 카테고리를 선택했을 때만 업데이트
    if (category !== newCategory) {
      setCategory(newCategory);
    } else {
      // 이미 선택된 카테고리를 다시 클릭했을 때 초기 상태(모든 카테고리)로 돌아오게 처리
      setCategory("");
    }
    await fetchData(category, keyword, hashtag, align);
  };

  // 정렬방식으로 필터링
  const handleAlignClick = async (newAlign: string) => {
    // 이전 선택과 다른 정렬 방식을 선택했을 때만 업데이트
    setAlign(newAlign);
    await fetchData(category, keyword, hashtag, align);
  };

  const fetchData = async (
    categoryValue: string,
    keywordValue: string,
    hashtagValue: string,
    alignValue: string
  ) => {
    try {
      // 서버에 데이터를 요청하고 응답을 처리, 경로는 수정해야함
      const response = await axios.get(
        `/posts?category=${categoryValue}&keyword=${keywordValue}&hashtag=${hashtagValue}}&align=${alignValue}`
      );

      // 응답 데이터
      console.log("응답 데이터:", response.data);
      // 서버로부터 받은 데이터를 처리하는 로직을 추가해야함
    } catch (error) {
      // 에러
      console.error("데이터 요청 에러:", error);
    }
  };

  return (
    <PostFilterComponent>
      <div>
        <div>
          <button onClick={() => handleCategoryClick("러닝")}>러닝</button>
          <button onClick={() => handleCategoryClick("등산")}>등산</button>
          <button onClick={() => handleCategoryClick("헬스")}>헬스</button>
        </div>
        <div>
          <PostFilterInput
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="검색어를 입력하세요"
          />
          <button onClick={handleKeywordSubmit}>검색</button>
        </div>
        <div>
          <PostFilterInput
            type="text"
            value={hashtag}
            onChange={handleHashtagChange}
            placeholder="태그로 검색해보세요!"
          />
          <button onClick={handleHashtagSubmit}>검색</button>
        </div>
        <div>
          <button onClick={() => handleAlignClick("최신순")}>최신순</button>
          <button onClick={() => handleAlignClick("조회수순")}>조회수순</button>
          <button onClick={() => handleAlignClick("좋아요순")}>좋아요순</button>
        </div>
      </div>
      <PopularHashtag>인기 해시태그</PopularHashtag>
    </PostFilterComponent>
  );
};

const PostFilterComponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 750px;
`;

const PostFilterInput = styled.input`
  width: 400px;
`;

const PopularHashtag = styled.div`
  width: 200px;
  height: 120px;
  background-color: #d7d7d7;
`;

export default PostFilter;
