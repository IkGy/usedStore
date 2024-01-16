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
import Chat_room from './components/chat/chat_room';
import Room_list from './components/chat/room_list';

import Test from './components/test';
import Test2 from './components/test2';

function App() {
  return (
    <div className='total_display'>
      <div className='display_section'>
        <Header />
        <Routes>
          <Route path='/' element={<Main></Main>}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
          <Route path='/mypage' element={<Mypage/>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/sign_up' element={<Sign_Up />}></Route>
          <Route path='/chatroom/:id' element={<Chat_room />}></Route>
          <Route path='/room_list' element={<Room_list />}></Route>

          <Route path='/test' element={<Test />}></Route>
          <Route path='/product/new' element={<Test2 />}></Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
