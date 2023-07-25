import { BrowserRouter ,Route, Routes } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

//운동 정보
import VideoList from './components/ExerciseInfo/VideoList';


function App() {
	return (
        <BrowserRouter>
            <Header />
                <Routes>
                    {/* <Route path='/' element={<Index />} /> */}
                    <Route path='/header' element={<Header />} />
                    {/* <Route path='/footer' element={<Footer />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signin' element={<Signin />} /> */}
                    {/* <Route path='/map' element={<Map />} /> */}
                    <Route path='/videoList' element={<VideoList />} />

                </Routes>
            <Footer />
        </BrowserRouter>
	);
}

export default App;