import React from "react";
import styled from "@emotion/styled";
import ChatInput from "./ChatInput";

interface Props {}

const ChatApp: React.FC<Props> = () => {
  return (
    <ChatAppContainer>
      <ChatRoom>
        <ChatRoomName></ChatRoomName>
        <ChatRoomContent></ChatRoomContent>
      </ChatRoom>
      <ChatInput />
    </ChatAppContainer>
  );
};

const ChatAppContainer = styled.div`
  position: relative;
  width: 900px;
  height: 500px;
  background-color: #d3d3d3;
`;

const ChatRoom = styled.div`
  background-color: #d3d3d3;
`;

const ChatRoomName = styled.div`
  height: 60px;
  background-color: #aaaaaa;
`;

const ChatRoomContent = styled.div`
  background-color: #d3d3d3;
`;

export default ChatApp;
