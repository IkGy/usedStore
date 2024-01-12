import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Main from './components/mainpage/main';
import Footer from './components/footer/footer';
import Detail from './components/detail/intex';
import Login from './components/login/login';
import Kakaotalk from './components/login/kakaotalk';
import Sign_Up from './components/sign_up/sign_up';

function App() {
  return (
    <div className='total_display'>
      <Header />
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign_up' element={<Sign_Up />}></Route>
        <Route path='/kakaotalk' element={<Kakaotalk />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
