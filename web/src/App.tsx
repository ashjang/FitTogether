import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useState } from 'react';

import './App.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MainPage from './pages/MainPage';

// 상단 우측 아이콘
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Messenger from './pages/Messenger';
import Bookmark from './pages/Bookmark';

//하단 4개 카테고리 해당페이지
import ExerciseInfo from './pages/ExerciseInfo';
import FindMate from './pages/FindMate';
import Posts from './pages/Posts';
import Post from './pages/Post';
import EditPost from './pages/EditPost';
import CreatePost from './pages/CreatePost';
import MyPage from './pages/MyPage';
import MyVideos from './pages/MyVideos';
import PasswordChange from './components/MyPage/PasswordChange';

import ScrollTopButton from './components/common/ScrollTopButton';
import ProtectedRoute from './components/Sign/ProtectedRoute';
import KakaoAuth from './components/Sign/KakaoAuth';

import './index.css';
import FindUserId from './components/Sign/FindUserId';
import FindUserPassword from './components/Sign/FindUserPassword';

const queryClient = new QueryClient();

// 토스트 알림 표시
const showToastNotification = (newAlert) => {
    const notification = new Notification('Fit Together 알림 도착', {
        body: newAlert,
    });

    setTimeout(() => {
        notification.close();
    }, 5000); // 5초 후에 알림 닫기
};

function App() {
    const [alert, setAlert] = useState([]); // SSE로 가져온 alert의 state 변수

    const [notificationEnabled, setNotificationEnabled] = useState(''); // 알림 권한 여부

    const EventSource = EventSourcePolyfill;
    const token = sessionStorage.getItem('token');

    let eventSource;

    const establishSSEConnection = () => {
        eventSource = new EventSource(`/api/notification/subscribe`, {
            headers: {
                'X-AUTH-TOKEN': token,
            },
        });

        eventSource.onopen = (event) => {
            // console.log('connection opened');
            // console.log(event.target.readyState);
        };

        eventSource.addEventListener('data', (event) => {
            console.log('EVENT : ' + event.data);
            const newAlert = JSON.parse(event.data); // 받은 데이터 추출
            console.log('newAlert : ', newAlert);

            // 토스트 알림 표시
            showToastNotification(newAlert.message); // message 필드 사용

            setAlert((prevAlert) => [newAlert, ...prevAlert]);
            console.log('prevAlert', alert);
        });

        eventSource.onerror = (event) => {
            // console.log(event.target.readyState);
            if (event.target.readyState === EventSource.CONNECTING) {
                // console.log('connecting...');

                // 연결 끊기
                eventSource.close();
                // establishSSEConnection();
            }
        };
    };

    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('알림 권한이 허용되었습니다.');
            establishSSEConnection(); // 허용된 경우 SSE 연결 설정
            setNotificationEnabled('알림 권한이 허용되었습니다. 실시간 알림을 받을 수 있습니다.'); // 알림 권한이 허용
        } else {
            console.log('알림 권한이 거부되었습니다.');
            setNotificationEnabled('알림 권한이 거부되었습니다. 실시간 알림을 받을 수 없습니다.'); // 알림 권한이 거부
        }
    };

    // SSE 구독하기
    useEffect(() => {
        if (!token) {
            return; // token이 없으면 함수 종료
        }

        // token이 있는 경우에만 알림 권한 요청
        requestNotificationPermission();
        // establishSSEConnection();

        return () => {
            if (eventSource) {
                eventSource.close(); // 컴포넌트 언마운트 시 SSE 연결 닫기
                console.log('eventsource closed');
            }
        };
    }, []);

    useEffect(() => {
        // (알림 권한을 확인하고 3초 후에 알림 메시지가 사라지게 함
        const timer = setTimeout(() => {
            setNotificationEnabled('');
        }, 3000);

        return () => {
            clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 해제
        };
    }, [notificationEnabled]);

    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <BrowserRouter>
                    <div
                        className={`centered-container ${
                            notificationEnabled ? 'visible' : 'hidden'
                        }`}
                    >
                        {notificationEnabled}
                    </div>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/kakao/callback" element={<KakaoAuth />} />
                        <Route path="/signup" element={<SignUp />} />
                        {/* <Route path="/messenger" element={<Messenger />} /> */}
                        <Route path="/messenger" element={<Messenger />}>
                            {/* 여기에 /messenger 경로 아래의 라우트 정의 */}
                            <Route path=":nickname" element={<Messenger />} />
                        </Route>
                        <Route path="/finduserid" element={<FindUserId />} />
                        <Route path="/finduserpassword" element={<FindUserPassword />} />
                        <Route element={<ProtectedRoute />}>
                            // 비로그인 상태에서는 접근 불가능한 컴포넌트들 모음
                            <Route path="/mypage" element={<MyPage />} />
                            <Route path="/mypage/passwordchange" element={<PasswordChange />} />
                            <Route path="/bookmark" element={<Bookmark />} />
                            <Route path="/playlists" element={<MyVideos />} />
                            <Route path="/findmate" element={<FindMate />} />
                        </Route>
                        <Route path="/exerciseInfo" element={<ExerciseInfo />} />
                        <Route path="/posts/" element={<Posts />} />
                        <Route path="/posts/:postId" element={<Post />} />
                        <Route path="/posts/:postId/editpost" element={<EditPost />} />
                        <Route path="/posts/createpost" element={<CreatePost />} />
                    </Routes>
                    <Footer />
                    <ScrollTopButton />
                </BrowserRouter>
            </RecoilRoot>
        </QueryClientProvider>
    );
}

export default App;
