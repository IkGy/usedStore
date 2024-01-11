import { Link } from "react-router-dom";
import Logo from "./image/logo.png"
import { FaSearch } from 'react-icons/fa'
import './header.css'
import { useEffect } from 'react';
import axios from 'axios';

function Header(){

useEffect(() => {
  axios.get('/header').then((result) => {
    console.log(result.data);
  })
},[])

  return(
    <div className="main_header">
      <div className="main_tItle"> 
        <img src={Logo} className="main_logo"></img>
        <span>홈페이지 이름</span>
      </div>
      <div className="main_searchBar">
        <input placeholder="상품명, 지역명, @상점명 입력" />
        <FaSearch className="main_searchIcon"/>
      </div>
      <div className="main_login">
        <ul>
          <li><Link to={'/login'}>로그인</Link></li>
          <li><Link to={'/join'}>회원가입</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Header;  