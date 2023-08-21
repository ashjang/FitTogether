import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

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

import ScrollTopButton from './components/common/ScrollTopButton';
import ProtectedRoute from './components/Sign/ProtectedRoute';
import KakaoAuth from './components/Sign/KakaoAuth';

import './index.css';
import FindUserId from './components/Sign/FindUserId';
import FindUserPassword from './components/Sign/FindUserPassword';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/kakao/callback" element={<KakaoAuth />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/messenger" element={<Messenger />} />
                        <Route path="/finduserid" element={<FindUserId />} />
                        <Route path="/finduserpassword" element={<FindUserPassword />} />
                        <Route element={<ProtectedRoute />}>
                            // 비로그인 상태에서는 접근 불가능한 컴포넌트들 모음
                            <Route path="/mypage" element={<MyPage />} />
                            <Route path="/bookmark" element={<Bookmark />} />
                            <Route path="/playlists" element={<MyVideos />} />
                            <Route path="/findmate" element={<FindMate />} />
                        </Route>
                        <Route path="/exerciseInfo" element={<ExerciseInfo />} />
                        <Route path="/posts" element={<Posts />} />
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
