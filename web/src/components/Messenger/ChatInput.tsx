import React from "react";
import styled from "@emotion/styled";

interface Props {}

const ChatInput: React.FC<Props> = () => {
  return (
    <InputBar>
      <InputField />
      <button>전송</button>
    </InputBar>
  );
};

const InputBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0px;
  width: 900px;
  height: 40px;
`;

const InputField = styled.input`
  width: 860px;
`;

export default ChatInput;
