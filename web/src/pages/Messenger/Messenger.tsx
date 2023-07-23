import React from "react";
import ChatList from "../../components/Messenger/ChatList";
// import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

interface Props {}

const Messenger: React.FC<Props> = () => {
  return (
    <Page>
      <ChatList />
    </Page>
  );
};

export default Messenger;
