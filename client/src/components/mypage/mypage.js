import React, { useEffect, useState } from "react";

import Buylist from "./buylist";
import Soldlist from "./soldlist";
import Registered from "./registered";
import Picklist from "./picklist";
import "./mypage.css";

import EK from "./image/이크.png"
import { getCookie } from "../../useCookies";


function Mypage() {

  console.log(getCookie("login"));

  const [data, setData] = useState([
    {
      uname: "정선우",
      unum: "010-9386-4594",
      uarea: "장안웃길 56 국제대학교",
      uage: "25",

    },
  ]);

  const [menu, setMenu] = useState("구매 목록");

  const MenuClick = (selectMenu) => {
    setMenu(selectMenu);
  };
  const [end, setEnd] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setEnd("end");
    }, 100);
    return setEnd("");
  }, [menu]);

  let [userInfo, setUSerInfo] = useState({
    // nickName: "??",
    // userName: "KDT",
    // phoneNumber: "010-1234-5678",
  });

  return(
    <div>
      <div className='JSW_container'>
        <div className="JSW_mypage_title">
          {/* 마이페이지 */}
        </div>
        <div className="JSW_Main">
          <div className='JSW_Sec1'>
            <div className="JSW_menubar">
              <nav className="JSW_nav1">
                    <ul>
                      <li>
                        
                      </li>
                      <li>
                        <a
                          href="#"
                          className={menu === "구매 목록" ? "active" : "noactive"}
                          onClick={() => MenuClick("구매 목록")}
                        >
                          구매 내역
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className={menu === "판매 목록" ? "active" : "noactive"}
                          onClick={() => MenuClick("판매 목록")}
                        >
                          판매 내역
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className={menu === "등록된 상품" ? "active" : "noactive"}
                          onClick={() => MenuClick("등록된 상품")}
                        >
                          등록된 상품
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className={menu === "찜 목록" ? "active" : "noactive"}
                          onClick={() => MenuClick("찜 목록")}
                        >
                          찜 목록
                        </a>
                      </li>
                    </ul>
                  </nav>
            </div>
          </div>
          <div className='JSW_Sec2'>
            <div className="JSW_Sec2-1">
              <div className="JSW_Sec2-1_left">
                <img src={EK}></img>
              </div>
              <div className="JSW_Sec2-1_Right">
                내 정보
                <div className="JSW_userinfo"  style={{ fontSize: '100%' }}> 
                  {data.map((a, i)=> {
                    return(
                      <div
                      key={a.id}
                      >
                        
                        <div className="JSW_username">이름 : {a.uname}</div>
                        <div className="JSW_usernum">전화번호 : {a.unum}</div>
                        <div className="JSW_userage">나이 : {a.uage}세</div>
                        <div className="JSW_userarea">주소지 : {a.uarea}</div>
                      </div>
                    )
                  })}
                </div>
                <label className="JSW_Cristal">
                  프로필 수정
                </label>
              </div>
            </div>
            <div className="JSW_Sec2-2">
              {menu === "구매 목록" && (
                <div className={"start " + end}>
                  <Buylist menu={menu} userInfo={userInfo}></Buylist>
                </div>
              )}

              {menu === "판매 목록" && (
                <div className={"start " + end}>
                  <Soldlist menu={menu} userInfo={userInfo}></Soldlist>
                </div>
              )}

              {menu === "등록된 상품" && (
                <div className={"start " + end}>
                  <Registered menu={menu} userInfo={userInfo}></Registered>
                </div>
              )}
              {menu === "찜 목록" && (
                <div className={"start " + end}>
                  <Picklist menu={menu} userInfo={userInfo}></Picklist>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypage


// <a href="https://kr.freepik.com/search?format=search&last_filter=type&last_value=icon&query=%EC%9D%B5%EB%AA%85%EC%9D%98%20%EC%96%BC%EA%B5%B4&type=icon">afif fudin 제작 아이콘</a>