import { Link, useNavigate, useParams } from "react-router-dom";
import { setCookie, getCookie } from "../../useCookies";
import React, { useEffect, useState } from "react";
import { API_URL } from '../config/contansts';
import axios from 'axios';
import Modal from "react-modal";

import Buylist from "./buylist";
import Soldlist from "./soldlist";
import Registeredview from "./registeredview";
import Picklist from "./picklist";
import "./mypage.css";
import EK from "./image/이크.png"


function Mypageview() {
  /* */
  const [selectedAddress, setSelectedAddress] = useState('');
  const [data, setData] = useState({})
  const [menu, setMenu] = useState("등록된 상품");
  const [end, setEnd] = useState("");
  const useId = useParams();

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
    axios.get(`${API_URL}/user/mypage`,{params:{id:useId.id}})
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
          "{data.nickname}" 님의 상점
        </div>
        <div className="JSW_Main_view">
          <div className='JSW_Sec1'>
            
          </div>
          <div className='JSW_Sec2_view'>
            <div className="JSW_Sec2-1">
              <div className="JSW_Sec2-1_left"
              // key={data.id}
              >
                <img src={data.profileIMG}></img>
              </div>
              <div className="JSW_Sec2-1_Right">
                <div className="JSW_myname">"{data.nickname}" 님의 정보 </div>
                <div className="JSW_userinfo"  style={{ fontSize: '100%' }}> 
                      <div
                      key={data.id}
                      >
                        <div className="JSW_userlist">이름 : {data.real_name}</div>
                        <div className="JSW_userlist">별명 : {data.nickname}</div>
                        <div className="JSW_userlist">상점 설명 : {data.about}</div>
                      </div>
                </div>
              </div>
            </div>
     

            <div className="JSW_Sec2-2">
              {menu === "등록된 상품" && (
                <div className={"start " + end}>
                  <Registeredview menu={menu} userInfo={userInfo} data={data}></Registeredview>
                </div>
              )}
         
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypageview
