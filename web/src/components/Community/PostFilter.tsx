import React, { useState } from "react";
import axios from "axios";

interface Props {}

const ComponentName: React.FC<Props> = () => {
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [hashtag, setHashtag] = useState("");

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleKeywordSubmit = async () => {
    // 서버에게 'keyword'로 필터링된 데이터 요청
    await fetchData(category, keyword, hashtag);
  };

  const handleHashtagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(event.target.value);
  };

  const handleHashtagSubmit = async () => {
    // 서버에게 'hashtag'로 필터링된 데이터 요청
    await fetchData(category, keyword, hashtag);
  };

  const handleCategoryClick = (newCategory: string) => {
    // 이전 선택과 다른 카테고리를 선택했을 때만 업데이트
    if (category !== newCategory) {
      setCategory(newCategory);
    } else {
      // 이미 선택된 카테고리를 다시 클릭했을 때 초기 상태로 돌아오게 처리
      setCategory("");
    }
  };

  const fetchData = async (
    selectedCategory: string,
    keywordValue: string,
    hashtagValue: string
  ) => {
    try {
      // 여기에서 서버에 데이터를 요청하고 응답을 처리합니다.
      // axios를 사용하여 서버와 통신합니다.
      // 예시로 요청 URL은 '/api/data'로 가정합니다.
      const response = await axios.get(
        `/posts?category=${selectedCategory}&keyword=${keywordValue}&hashtag=${hashtagValue}`
      );

      // 응답 데이터 처리
      console.log("응답 데이터:", response.data);
      // 서버로부터 받은 데이터를 처리하는 로직을 추가하세요.
    } catch (error) {
      // 에러 처리
      console.error("데이터 요청 에러:", error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <button onClick={() => handleCategoryClick("러닝")}>러닝</button>
          <button onClick={() => handleCategoryClick("등산")}>등산</button>
          <button onClick={() => handleCategoryClick("헬스")}>헬스</button>
        </div>
        <div>
          <input type="text" value={keyword} onChange={handleKeywordChange} />
          <button onClick={handleKeywordSubmit}>검색</button>
        </div>
        <div>
          <input type="text" value={hashtag} onChange={handleHashtagChange} />
          <button onClick={handleHashtagSubmit}>검색</button>
        </div>
      </div>
      <div>인기 해시태그</div>
    </div>
  );
};

export default ComponentName;
