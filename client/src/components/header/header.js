import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'
import { LuUserPlus2 } from "react-icons/lu";
import { CiLogin } from "react-icons/ci";
import Logo from "./image/logo.png"
import './header.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie, removeCookie } from "../../useCookies";
import { API_URL } from "../config/contansts";

function Header(){
  const [userInfo,setUserInfo] = useState();
  const navigate = useNavigate()
  
  // useEffect(() => {
  //   axios.get(`${API_URL}/header`).then((result) => {
  //   console.log(result.data);
  // })
  // },[])

  const logOut = () => {
    removeCookie('login');
    window.localStorage.removeItem('kakao_account');
    navigate('/');
  }

  return(
    <div className="main_header">
      <div className="header_contents">
        <Link to={'/'} className="main_title">
          <img src={Logo} className="main_logoIcon"/>
          <span className="main_titleName">리셀 마켓</span>
        </Link>
        <div className="main_searchBar">
          <input className="searchBar_input" placeholder="상품명, 지역명, @상점명 입력" />
          <FaSearch className="main_searchIcon"/>
        </div>
        <div className="main_login">
          {getCookie("login") ?
          <nav>
            <ul className="header_login">
              <li></li>
              <li><Link onClick={logOut}>로그아웃</Link></li>
            </ul>
            <ul>
              <li><span></span><Link to={'/sale'}>판매하기</Link></li>
              <li><span></span><Link to={'/mypage'}>내정보</Link></li>
              <li><span></span><Link to={'/chat'}>채팅</Link></li>
            </ul>
          </nav>
          :
          <ul className="header_login">
            <li><CiLogin className="main_loginIcon"/><Link to={'/login'}>로그인</Link></li>
            <li><LuUserPlus2 className="main_singUpIcon"/><Link to={'/sign_up'}>회원가입</Link></li>
          </ul>
          }
        </div>
      </div>
      {/* <div className="header_list">
        <nav>
          <ol>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ol>
        </nav>
      </div> */}
    </div>
  )
}

export default Header;  