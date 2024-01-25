import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaWonSign } from "react-icons/fa";
import { LuUserPlus2, LuUserCircle2 } from "react-icons/lu";
import { AiOutlineAliwangwang } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import Logo from "./image/logo.png";
import "./header.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie, removeCookie } from "../../useCookies";
import { API_URL } from "../config/contansts";

let currentPath = "";
function Header() {
  let location = useLocation();
  console.log("location pathname: ", location.pathname);
  useEffect(() => {
    if (currentPath === location.pathname) window.location.reload();
    currentPath = location.pathname;
  }, [location]);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const navi = (e) => {
    e.preventDefault();
    setSearch("");
    navigate(`/main/${search}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navi(e);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/user/header`, { params: { id: getCookie("login") } })
      .then((result) => {
        console.log(result.data);
      });
  }, []);

  useEffect(() => {
    // 카카오 SDK 초기화
    const kakaoScript = document.createElement("script");
    kakaoScript.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js";
    kakaoScript.integrity =
      "sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8";
    kakaoScript.crossOrigin = "anonymous";
    document.body.appendChild(kakaoScript);

    kakaoScript.onload = () => {
      // 카카오 SDK 초기화
      window.Kakao.init("90b9cec28ae877d95b8c171eabad92f5");
    };

    axios
      .get(`${API_URL}/user/header`, { params: { id: getCookie("login") } })
      .then((result) => {
        console.log(result.data);
      });
  }, []);

  const deleteCookie = () => {
    document.cookie =
      "authorize-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  const logOut = (e) => {
    e.preventDefault();
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name] = cookie.split("=");
      removeCookie("name");
    }
    window.localStorage.clear();
    if (getCookie("login")) {
      removeCookie('login');
      window.Kakao.Auth.logout()
        .then(function () {
          alert(
            "logout ok\naccess token -> " + window.Kakao.Auth.getAccessToken()
          );
          deleteCookie();
        })
        .catch(function () {
          // alert("Not logged in");
        });
    }
    navigate("/");
    // window.location.href = '/'
  };

  return (
    <div className="main_header">
      <div className="header_contents">
        <Link to={"/"} className="main_title">
          <img src={Logo} className="main_logoIcon" />
          <span className="main_titleName">리셀 마켓</span>
        </Link>
        <div className="header_position">
          <div className="main_searchBar">
            <input
              className="searchBar_input"
              placeholder="상품명, 태그 입력"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <FaSearch className="main_searchIcon" onClick={navi} />
          </div>
          <div className="main_login">
            {getCookie("login") ? (
              <nav>
                <ul className="header_login">
                  <li className="header_login_nav">
                    <Link to={"/sellitem"}>
                      <FaWonSign className="main_loginIcon" />
                      판매하기
                    </Link>
                    <Link to={"/mypage"} >
                      <LuUserCircle2 className="main_loginIcon" />
                      내정보
                    </Link>
                    <Link to={"/chat"}>
                      <AiOutlineAliwangwang className="main_loginIcon" />
                      채팅
                    </Link>
                  </li>
                  <li className="login_logout">
                    <Link onClick={logOut} className="main_logout">
                      로그아웃
                    </Link>
                  </li>
                </ul>
              </nav>
            ) : (
              <ul className="header_login">
                <li>
                  <CiLogin className="main_mainIcon" />
                  <Link to={"/login"}>로그인</Link>
                </li>
                <li>
                  <LuUserPlus2 className="main_mainIcon" />
                  <Link to={"/sign_up1"}>회원가입</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
        </div>
    </div>
  );
}

export default Header;
