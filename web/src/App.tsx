import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import MainPage from './pages//MainPage';
import ExerciseInfo from './pages/ExerciseInfo';
import FineMate from './pages/FineMate';

import ScrollTopButton from './components/common/ScrollTopButton'; 

import "./index.css";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Header />
					<Routes>
							<Route path='/' element={<MainPage />} />
							<Route path="/header" element={<Header />} />
							<Route path='/footer' element={<Footer />} />
							<Route path='/exerciseInfo' element={<ExerciseInfo />} />
							<Route path='/fineMate' element={<FineMate />} />
					</Routes>
				<Footer />
				<ScrollTopButton />
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
