import React from 'react';
import ChatApp from '../components/Messenger/ChatApp';
import ChatList from '../components/Messenger/ChatList';
import styled from '@emotion/styled';

interface Props {}

const Messenger: React.FC<Props> = () => {
    return (
        <Page>
            <Component>
                <ChatList />
                <ChatApp />
            </Component>
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    // min-height는 삭제 예정
    min-height: calc(100vh - 300px);
`;

const Component = styled.div`
    display: flex;
    width: 1190 px;
    border: 1px solid rgba(0, 0, 0, 10%);
`;

export default Messenger;
