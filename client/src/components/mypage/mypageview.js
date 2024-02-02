import { Link, useNavigate, useParams } from "react-router-dom";
import { setCookie, getCookie } from "../../useCookies";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config/contansts";
import axios from "axios";
import Modal from "react-modal";

import Registeredview from "./registeredview";
import Hoogi from "./hoogi";
import "./mypage.css";

function Mypageview() {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [data, setData] = useState({});
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

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const MenuClick = (selectMenu) => {
    setMenu(selectMenu);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/user/mypage`, { params: { id: useId.id } })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log("실패");
      });
  }, []);

  const [getReview, setGetReview] = useState([]);

  useEffect(() => {
    const fetchGetReview = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/mypageview/${useId.id}`);
        setGetReview(res.data.review);
      } catch (error) {
        console.error("데이터를 불러오지 못했습니다:", error.response?.data);
      }
    };
    fetchGetReview();
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

  return (
    <div>
      <div className="JSW_container">
        <div className="JSW_mypage_title">"{data.nickname}" 님의 상점</div>
        <div className="JSW_Main">
          <div className="JSW_Sec1">
            <div className="JSW_menubar">
              <nav className="JSW_nav1">
                <span id="JSW_Mypage_tag"></span>
                <ul className="CHM_uibt">
                  <li className="JSW_firstlist">
                    <p
                      href="#"
                      className={menu === "등록된 상품" ? "active" : "noactive"}
                      onClick={() => MenuClick("등록된 상품")}
                    >
                      등록된 상품
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      className={menu === "후기" ? "active" : "noactive"}
                      onClick={() => MenuClick("후기")}
                    >
                      구매 후기
                    </p>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="JSW_Sec2">
            <div className="CHM_myinfocontain">
              <div className="CHM_myinfobox1">
                <div className="CHM_myinfoimgbox">
                  <img src={data.profileIMG}></img>
                </div>
                <div className="CHM_useringoflex">
                  <div className="JSW_myname">
                    <div>상세정보</div>
                  </div>
                  <div className="JSW_userlist">별명 : {data.nickname}</div>
                  
                  <div className="JSW_useraboutbox2">
                  <div>소개글</div>
                    <div className="JSW_userabout2">{data.about}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="JSW_Sec2-2">
              {menu === "등록된 상품" && (
                <Registeredview menu={menu} data={data}></Registeredview>
              )}
              {menu === "후기" && (
                <div>
                  <Hoogi menu={menu}></Hoogi>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypageview;