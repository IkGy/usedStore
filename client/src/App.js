import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from './components/header/header';
import Main from './components/mainpage/main';
import Footer from './components/footer/footer';
import Detail from './components/detail';
import Detail_Error from './components/detail/error';
import Mypage from './components/mypage/mypage';
import Mypageview from './components/mypage/mypageview';
import Login from './components/login/login';
import Sign_Up from './components/sign_up/sign_up';
import Sign_Up1 from './components/sign_up/sign_up1';
import Sale from './components/sale/regi'
import Chat from './components/chat/chat';
import Rules from './components/guide/rules';
import Rro from './components/guide/pro';
import Location from './components/guide/location';
import Searchpage from './components/searchpage/searchpage';
import Categorysc from './components/searchpage/categotysc';
import FindPW from './components/login/findpw';
import Sellitemedit from './components/mypage/sale/regi';
import MakeNewPW from './components/login/makenewpw';
import AdminMain from './components/admin/main/admin_main';
import UserManagement from './components/admin/page/user_mgmt';
import ProductManagement from './components/admin/page/product_mgmt';
import Report from "./components/admin/page/report";
import Singo from './components/mypage/singo/singo';
import ScrollToTopButton from './topbtn.js'


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="total_display">
      <ScrollToTopButton></ScrollToTopButton> 
      <ScrollToTop />
      <div className="display_section">
        <Header />
        <Routes>
          <Route path='/' element={<Main></Main>}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
          <Route path='/detail/error' element={<Detail_Error />}></Route>
          <Route path='/mypage' element={<Mypage/>}></Route>
          <Route path='/mypage/:id' element={<Mypage/>}></Route>
          <Route path='/mypage/:id/:picklist' element={<Mypage/>}></Route>
          <Route path='/mypageview/:id' element={<Mypageview/>}></Route>
          <Route path='/singo/:product_id' element={<Singo/>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/findpw' element={<FindPW />}></Route>
          <Route path='/makenewpw' element={<MakeNewPW />}></Route>
          <Route path='/sign_up' element={<Sign_Up />}></Route>
          <Route path='/sign_up1' element={<Sign_Up1 />}></Route>
          <Route path='/chat' element={<Chat />}></Route>
          <Route path='/rules' element={<Rules />}></Route>
          <Route path='/pro' element={<Rro />}></Route>
          <Route path='/location' element={<Location />}></Route>
          <Route path='/sellitem' element={<Sale />}></Route>
          <Route path='/sellitemedit/:id' element={<Sellitemedit />}></Route>
          <Route path='/main/:search' element={<Searchpage />}></Route>
          <Route path='/detailsearch/:category' element={<Categorysc />}></Route>
          <Route path='/admin_main' element={<AdminMain />}></Route>
          <Route path='/page/user_mgmt' element={<UserManagement />}></Route>
          <Route path='/page/report' element={<Report />}></Route>
          <Route path='/page/product_mgmt' element={<ProductManagement />}></Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
