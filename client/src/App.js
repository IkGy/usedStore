import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Main from './components/mainpage/main';
import Footer from './components/footer/footer';
import Detail from './components/detail/intex';
import Mypage from './components/mypage/mypage';

function App() {
  return (
    <div className='total_display'>
      <Header />
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/detail' element={<Detail />}></Route>
        <Route path='/mypage' element={<Mypage/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
