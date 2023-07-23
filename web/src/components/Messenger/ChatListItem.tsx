/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import default_user_image from "./default_user_image.png";

const ProfileListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 270px;
  height: 60px;
  background-color: white;
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

const TextContainer = styled.div`
  width: 220px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {}

const ChatListItem: React.FC<Props> = () => {
  const imageSrc: string = default_user_image;

  // useState 초기값은 삭제 예정
  const [profileImg, setProfileImg] = useState<string>(imageSrc);
  const [sender, setSender] = useState<string>("운동중독자");
  const [lastTime, setLastTime] = useState<string>("7월 24일");
  const [shortenlastMessage, setShortenLastMessage] =
    useState<string>("안녕하세요💪💪💪");
  const [newMessagesNum, setNewMessagesNum] = useState<number>(1);

  // 아직 타입 명시X (어차피 지워질듯)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("");
        const { profileImg, sender, lastTime, lastMessage, newMessagesNum } =
          response.data;

        const shortenMessage =
          lastMessage.length > 15
            ? `${lastMessage.slice(0, 15)}...`
            : lastMessage;

        setSender(sender);
        setLastTime(lastTime);
        setShortenLastMessage(shortenMessage);
        setProfileImg(profileImg);
        setNewMessagesNum(newMessagesNum);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ProfileListItem>
      <ProfileImageContainer>
        <ProfileImage src={profileImg} />
      </ProfileImageContainer>
      <TextContainer className="styledComponent;">
        <RowDiv>
          <p css={css({ fontSize: "16px", fontWeight: "bold" })}>{sender}</p>
          <p css={css({ fontSize: "12px", color: "gray", marginRight: "5px" })}>
            {lastTime}
          </p>
        </RowDiv>
        <RowDiv>
          <p css={css({ fontSize: "14px" })}>{shortenlastMessage}</p>
          {newMessagesNum > 0 && (
            <p
              css={css({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "20px",
                height: "20px",
                marginRight: "5px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
              })}
            >
              {newMessagesNum}
            </p>
          )}
        </RowDiv>
      </TextContainer>
    </ProfileListItem>
  );
};

export default ChatListItem;
