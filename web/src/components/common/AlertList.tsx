import React from 'react';
import { FaRegBell } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import styled from '@emotion/styled';
import AlertListItem from './AlertListItem';

const AlertList: React.FC = () => {
  return (
    <AlertContainer>
      <AlertArea>
        <AlertTitle>
          <FaRegBell />
          <AlertText>알림</AlertText>
        </AlertTitle>
        <FiSettings />
      </AlertArea>
      <AlertContents>
        <AlertListItem />
      </AlertContents>
    </AlertContainer>
  );
};

const AlertContainer = styled.div`
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  right: -187px;
  top: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);
`;

const AlertArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 20px;
`;

const AlertTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertText = styled.div`
  margin-left: 5px;
`;

const AlertContents = styled.div`
  width: 100%;
  height: 85%;
  border-top: 2px solid #f1f1f1;
  padding: 10px 20px;
  overflow: auto;
`;

export default AlertList;
