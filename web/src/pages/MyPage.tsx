import React, { useState } from 'react';
import MyInformation from '../components/MyPage/MyInformation';
import MyPostList from '../components/MyPage/MyPostList';
import styled from '@emotion/styled';

interface ButtonProps {
    isActive: boolean;
}

const MyPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('MyInformation');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <MypageContainer>
            <TabArea>
                <Button
                    isActive={activeTab === 'MyInformation'}
                    onClick={() => handleTabClick('MyInformation')}
                >
                    나의 정보
                </Button>
                <Button
                    isActive={activeTab === 'MyPostList'}
                    onClick={() => handleTabClick('MyPostList')}
                >
                    작성 게시글
                </Button>
            </TabArea>
            <Content>
                {activeTab === 'MyInformation' && <MyInformation />}
                {activeTab === 'MyPostList' && <MyPostList />}
            </Content>
        </MypageContainer>
    );
};

const MypageContainer = styled.div`
    margin-top: 150px;
`;

const Button = styled.button<ButtonProps>`
    width: 180px;
    height: 50px;
    border-radius: 30px;
    // background-color: white;
    background-color: ${(props) => (props.isActive ? '#d9d9d9' : 'white')};
    border: none;
    padding: 9px 20px;
    margin-right: 25px;
    font-weight: bold;
    font-size: 22px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;

    &:hover {
        background-color: #d9d9d9;
    }
`;

const TabArea = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-top: 50px;
    margin-bottom: 70px;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    margin-bottom: 50px;
`;

export default MyPage;
