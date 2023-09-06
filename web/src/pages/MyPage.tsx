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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    min-height: calc(100vh - 200px);
    margin: 120px auto 0;
    padding: 20px;
`;

const TabArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    margin-bottom: 30px;
`;

const Title = styled.h2`
    height: 50px;
    font-weight: bold;
    font-size: 22px;
    white-space: nowrap;
    overflow: hidden;
`;

const GoTo = styled.div`
    font-size: 1.3rem;
    color: blue;
`;

const Content = styled.div`
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default MyPage;
