import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/common/Header";
// import Footer from './components/common/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path='/' element={<Index />} /> */}
        <Route path="/header" element={<Header />} />
        {/* <Route path='/footer' element={<Footer />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signin' element={<Signin />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
