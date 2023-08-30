import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import MyInformation from '../components/MyPage/MyInformation';

// interface ButtonProps {
//     isActive: boolean;
// }

const MyPage: React.FC = () => {
    // const [activeTab, setActiveTab] = useState('MyInformation');
    // const isLoggedIn = useRecoilValue(loggedInState);
    // const navigate = useNavigate();

    // if (!isLoggedIn) {
    //     navigate('/signin');
    // }

    // const handleTabClick = (tabName: string) => {
    //     setActiveTab(tabName);
    // };

    return (
        <MypageContainer>
            <TabArea>
                <Title
                // isActive={activeTab === 'MyInformation'}
                // onClick={() => handleTabClick('MyInformation')}
                >
                    {/* <Link to="/mypage/myinformation"> */}
                    나의 정보
                    {/* </Link> */}
                </Title>
                <Link to="/mypage/passwordchange">
                    <GoTo>비밀번호 변경하러 가기</GoTo>
                </Link>
            </TabArea>
            <Content>
                <MyInformation />
                {/* {activeTab === 'MyInformation' && <MyInformation />} */}
                {/* {activeTab === 'PasswordChange' && <PasswordChange />} */}
            </Content>
        </MypageContainer>
    );
};

const MypageContainer = styled.div`
    margin-top: 80px;
    min-height: 100vh;
    // width: 1040px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h2`
    width: 180px;
    height: 50px;
    font-weight: bold;
    font-size: 22px;
    white-space: nowrap;
    overflow: hidden;
`;

const GoTo = styled.div`
    font-size: 1.3rem;
    // margin-left: 100px;
`;

const TabArea = styled.div`
    width: 80%;
    display: flex;
    // justify-content: center;
    justify-content: space-around;
    align-items: center;
    margin-top: 150px;
    margin-bottom: 70px;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
`;

export default MyPage;
