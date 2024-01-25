import { Link, useNavigate } from "react-router-dom";
import { setCookie, getCookie } from "../../useCookies";
import React, { useEffect, useState } from "react";
import { API_URL } from '../config/contansts';
import axios from 'axios';
import Modal from "react-modal";

import Buylist from "./buylist";
import Soldlist from "./soldlist";
import Registered from "./registered";
import Picklist from "./picklist";
import "./mypage.css";
import EK from "./image/이크.png"


function Mypage() {
  /* */
  const [selectedAddress, setSelectedAddress] = useState('');
  const [data, setData] = useState({})
  const [menu, setMenu] = useState("등록된 상품");
  const [end, setEnd] = useState("");

  let [modalIsOpen, setModalIsOpen] = useState(false); 
  let [zIndex, setZindex] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setEnd("end");
    }, 100);
    return setEnd("");
  }, [modalIsOpen]); // 로그인 모달창 등장시 등장애내메이션을 담당하는 useEffect

  const editUser = async(e) => {
    e.preventDefault();
    const nickname = e.target?.nickname?.value || ''; // 값이 없을 때 빈 문자열로 설정
    const about = e.target?.about?.value || '';
    const address = e.target?.address?.value || '';
    const profileIMG = e.target?.profileIMG?.value || '';
    const id = getCookie("login");
    
    console.log("test", nickname, about, id, address, profileIMG);

    await axios.post(`${API_URL}/user/edit`, {
      id,
      nickname,
      about,
      address,
      profileIMG
    }).then(() => {
      setModalIsOpen(false);
    })
    .catch(() => {

    })
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAddressClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 주소 선택 후 state에 저장
        const fullAddress = `${data.address} ${data.buildingName || ''}`;
        setSelectedAddress(fullAddress);
        console.log(data);
      },
    }).open();
  };
  

  const MenuClick = (selectMenu) => {
    setMenu(selectMenu);
  };

  useEffect(() => {
    axios.get(`${API_URL}/user/mypage`,{params:{id:getCookie('login')}})
    .then((res) => {
      console.log("DB 조회 완료");
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.error(err);
      console.log("실패");
    });
  }, []);

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
          마이페이지
        </div>
        <div className="JSW_Main">
          <div className='JSW_Sec1'>
            <div className="JSW_menubar">
              <nav className="JSW_nav1">
                      <span id="JSW_Mypage_tag">
                      </span>
                    <ul>
                      <li>
                        <a
                          href="#"
                          className={menu === "구매 내역" ? "active" : "noactive"}
                          onClick={() => MenuClick("구매 내역")}
                        >
                          구매 내역
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className={menu === "판매 내역" ? "active" : "noactive"}
                          onClick={() => MenuClick("판매 내역")}
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
              <div className="JSW_Sec2-1_left"
              // key={data.id}
              >
                <img src={data.profileIMG}></img>
              </div>
              <div className="JSW_Sec2-1_Right">
                <div className="JSW_myname">내 정보 </div>
                <div className="JSW_userinfo"  style={{ fontSize: '100%' }}> 
                      <div
                      key={data.id}
                      >
                        <div className="JSW_userlist">이름 : {data.real_name}</div>
                        <div className="JSW_userlist">별명 : {data.nickname}</div>
                        <div className="JSW_userlist">전화번호 : {data.phone_number}</div>
                        <div className="JSW_userlist">이메일 : {data.email}</div>
                        <div className="JSW_userlist">주소지 : {data.address}</div>
                        <div className="JSW_userlist">상점 설명 : {data.about}</div>
                      </div>
                </div>
                
                {/* <Link
                className="loginBtn"
                style={{ textDecoration: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  setModalIsOpen(true);
                  setZindex(0);
                }}>
                <label className="JSW_Cristal">
                  비밀번호 변경
                </label>
                </Link> */}
                <Link
                className="loginBtn"
                style={{ textDecoration: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  setModalIsOpen(true);
                  setZindex(0);
                }}>
                <label className="JSW_Cristal2">
                  프로필 수정
                </label>
                </Link>
              </div>
            </div>
            <div>
              <Modal
              className={"loginModal"}
              isOpen={modalIsOpen}
              bodyOpenClassName="modal-open"
              onRequestClose={() => {
                console.log('test');
                setModalIsOpen(false);
                setZindex(1);
              }}
            > {/* 로그인버튼 클릭시 보여주는 모달창 */}
            <form onSubmit={editUser} className={"start " + end} id="JSW_modalALL">
            <div
              className="JSW_modal_loginCloseBtn"
              onClick={() => {
                setModalIsOpen(false);
                setZindex(1);
              }}
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
            <div className="JSW_modal_mainTitle">내 정보</div>
            <div className="JSW_modal_loginInputBox">
              <input
                style={{backgroundColor:"#CCF4DC"}}
                className="JSW_modal_loginInputBox_s" 
                id="real_name" 
                type="text" 
                value={data.real_name}
                placeholder="이름"
              ></input>
              <input
                className="JSW_modal_loginInputBox_s" 
                id="nickname"
                type="text"
                defaultValue={data.nickname}
                placeholder="별명을 정해주세요."
              ></input>
            
              <input
                className="JSW_modal_loginInputBox_s" 
                id="address"
                type="text"
                value={data.address||selectedAddress}
                onClick={handleAddressClick}
                // defaultValue={data.address}
                placeholder={data.address}
              ></input>
              <input
                className="JSW_modal_loginInputBox_s" 
                id="about"
                type="text"
                defaultValue={data.about}
                placeholder="상점 설명을 적어주세요."
              ></input>
                <div>
                  <div className="JSW_imgupload">
                    <span>이미지 업로드</span>
                  </div>
                  <input
                    className="JSW_modal_loginInputBox_s" 
                    id="profileIMG"
                    type = "file" 
                    accept = "image/jpg, image/jpeg, image/png"
                    placeholder={EK}
                    ></input>
                  <input
                  type="imgage"
                  defaultValue={data.profileIMG}
                  ></input>
                </div>
              </div>
              <button type="submit" className="JSW_mypagewater"
              onClick={()=>{
                window.location.reload();
              }}
              >수정 완료</button>
              </form>
            </Modal>
            </div>

            <div className="JSW_Sec2-2">
              {menu === "구매 내역" && (
                <div className={"start " + end}>
                  <Buylist menu={menu} userInfo={userInfo} data={data}></Buylist>
                </div>
              )}

              {menu === "판매 내역" && (
                <div className={"start " + end}>
                  <Soldlist menu={menu} userInfo={userInfo}></Soldlist>
                </div>
              )}

              {menu === "등록된 상품" && (
                <div className={"start " + end}>
                  <Registered menu={menu} userInfo={userInfo} data={data}></Registered>
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