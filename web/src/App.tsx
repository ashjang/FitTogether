import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Header from './components/common/Header';


function App() {
	return (
		<div className="app">
			<div className="header-body">
				<Header />
			</div>
			<div className="headerUnder">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/festivalProduct" element={<FestivalProduct />} />
					<Route path="/festivalDetail/:id" element={<FestivalDetail />} />
					<Route path="/oitaProduct" element={<OitaProduct />} />
					<Route path="/oitaDetail/:id" element={<OitaDetail />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/wishList" element={<WishList />} />
				</Routes>
			</div>
			<div className="footer-body">
				{/* <Footer /> */}
			</div>
		</div> 
	);
}

export default App;
