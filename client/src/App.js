import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Main from './components/mainpage/main';
import Footer from './components/footer/footer';
import Detail from './components/detail/intex';
import Mypage from './components/mypage/mypage';
import Login from './components/login/login';
import Sign_Up from './components/sign_up/sign_up';
import Sale from './components/sale/sale'
import Regi from './components/sale/regi';

function App() {
  return (
    <div className='total_display'>
      <Header />
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
        <Route path='/mypage' element={<Mypage/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign_up' element={<Sign_Up />}></Route>
        <Route path='/sale' element={<Sale />}></Route>
        <Route path='/regi' element={<Regi />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
