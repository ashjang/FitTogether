import React from 'react';
import ChatApp from '../components/Messenger/ChatApp';
import styled from '@emotion/styled';

const Messenger: React.FC = () => {
    return (
        <Page>
            <ChatApp />
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    max-width: 1440px;
    min-height: calc(100vh - 200px);
    margin: 150px auto 0;
    overflow: hidden;
`;

export default Messenger;
