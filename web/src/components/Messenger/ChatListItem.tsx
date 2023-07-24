/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const ProfileListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface Props {
  senderProfileImage: string;
  senderNickname: string;
  lastMessageDate: string;
  lastMessageContent: string;
  newMessageCount: number;
}

const ChatListItem: React.FC<Props> = ({
  senderProfileImage,
  senderNickname,
  lastMessageDate,
  lastMessageContent,
  newMessageCount,
}) => {
  return (
    <ProfileListItem>
      <ProfileImageContainer>
        <ProfileImage src={senderProfileImage} />
      </ProfileImageContainer>

      <ColDiv
        css={css({
          width: "150px",
        })}
      >
        <p css={css({ fontSize: "16px", fontWeight: "bold" })}>
          {senderNickname}
        </p>
        <p css={css({ fontSize: "14px" })}>{lastMessageContent}</p>
      </ColDiv>
      <ColDiv
        css={css({
          alignItems: "flex-end",
          width: "60px",
          height: "44px",
        })}
      >
        <p
          css={css({
            fontSize: "12px",
            color: "gray",
            marginRight: "5px",
            // whiteSpace는 추후 삭제
            whiteSpace: "nowrap",
          })}
        >
          {lastMessageDate}
        </p>
        {newMessageCount > 0 && (
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
            {newMessageCount}
          </p>
        )}
      </ColDiv>
    </ProfileListItem>
  );
};

export default ChatListItem;
