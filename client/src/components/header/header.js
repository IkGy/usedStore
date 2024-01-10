import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'
import { LuUserPlus2 } from "react-icons/lu";
import { CiLogin } from "react-icons/ci";
import { FaCloud } from "react-icons/fa";
import './header.css'
import { getCookie } from "../../useCookies";

function Header(){
  return(
    <div className="main_header">
      <div className="header_contents">
        <div className="main_title">
          <FaCloud className="main_logoIcon"/>
          
          <span className="main_titleName">홈페이지 이름</span>
        </div>
        <div className="main_searchBar">
          <input className="searchBar_input" placeholder="상품명, 지역명, @상점명 입력" />
          <FaSearch className="main_searchIcon"/>
        </div>
        <div className="main_login">
          {getCookie("login") ? 
          <ul>
            <li><span><CiLogin /></span><Link to={'/login'}>로그인</Link></li>
            <li><span><LuUserPlus2 /></span><Link to={'/join'}>회원가입</Link></li>
          </ul>
          :
          <ul>
            <li><span><CiLogin /></span><Link to={'/login'}>로그인</Link></li>
            <li><span><LuUserPlus2 /></span><Link to={'/join'}>회원가입</Link></li>
          </ul>
          }
        </div>
      </div>
      <div className="header_list">
        <nav>
          <ol>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default Header;  