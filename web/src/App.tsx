import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

// 상단 우측 아이콘
import Login from './pages/LogIn/LogIn';
import Signin from './pages/LogInSub/SignIn';
import Messenger from './pages/Messenger/Messenger';
import Bookmark from './pages/Bookmark/Bookmark';

//하단 4개 카테고리 해당페이지
import ExerciseInfo from './pages/ExerciseInfo/ExerciseInfo';
import FindMate from './pages/FindMate/FindMate';
import Community from './pages/Community/Community';
import MyPage from './pages/MyPage/MyPage';



import "./index.css";

function App() {
	return (
		<BrowserRouter>
			<Header />
				<Routes>
						<Route path='/' />
						<Route path="/header" element={<Header />} />
						<Route path='/footer' element={<Footer />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signin' element={<Signin />} />
						<Route path='/messenger' element={<Messenger />} />
						<Route path='/bookmark' element={<Bookmark />} />
						<Route path='/exerciseInfo' element={<ExerciseInfo />} />
						<Route path='/findMate' element={<FindMate />} />
						<Route path='/community' element={<Community />} />
						<Route path='/myPage' element={<MyPage />} />
				</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
