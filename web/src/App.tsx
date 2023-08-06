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
import Community from './pages/Community';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import MyPage from './pages/MyPage';
import MyVideos from './pages/MyVideos';

import ScrollTopButton from './components/common/ScrollTopButton';

import './index.css';

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
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/messenger" element={<Messenger />} />
                        <Route path="/bookmark" element={<Bookmark />} />
                        <Route path="/exerciseInfo" element={<ExerciseInfo />} />
                        <Route path="/findmate" element={<FindMate />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/community/:postId" element={<Post />} />
                        <Route path="/community/createpost" element={<CreatePost />} />
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/mypage/myvideos" element={<MyVideos />} />
                    </Routes>
                    <Footer />
                    <ScrollTopButton />
                </BrowserRouter>
            </RecoilRoot>
        </QueryClientProvider>
    );
}

export default App;
