import React, { useState } from 'react';
// import { useRecoilValue } from 'recoil';
// import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

// import { loggedInState } from '../recoil/AuthState/atoms';
import MyInformation from '../components/MyPage/MyInformation';
// import MyPostList from '../components/MyPage/MyPostList';
import PasswordChange from '../components/MyPage/PasswordChange';

interface ButtonProps {
    isActive: boolean;
}

const MyPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('MyInformation');
    // const isLoggedIn = useRecoilValue(loggedInState);
    // const navigate = useNavigate();

    // if (!isLoggedIn) {
    //     navigate('/signin');
    // }

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
                    isActive={activeTab === 'PasswordChange'}
                    onClick={() => handleTabClick('PasswordChange')}
                >
                    비밀번호 변경
                </Button>
            </TabArea>
            <Content>
                {activeTab === 'MyInformation' && <MyInformation />}
                {activeTab === 'PasswordChange' && <PasswordChange />}
            </Content>
        </MypageContainer>
    );
};

const MypageContainer = styled.div`
    margin-top: 150px;

    min-height: 100vh;
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
