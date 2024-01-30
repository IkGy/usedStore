import { Link, useNavigate } from "react-router-dom";
import { setCookie, getCookie } from "../../useCookies";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config/contansts";
import axios from "axios";
import Modal from "react-modal";
import Registered from "./registered";
import Picklist from "./picklist";
import Mypagehoogi from "./mypagehoogi";
import "./mypage.css";
import Withdraw from "../mypage/withdraw/withdraw";


function Mypage() {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [data, setData] = useState({});
  const [menu, setMenu] = useState("등록된 상품");
  const [profileIMG, setImage] = useState([]);
  const [prewviewimg, setpreviwimg] = useState([]);
  let [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/user/mypage`, { params: { id: getCookie("login") } })
      .then((res) => {
        setData(res.data);
        setSelectedAddress(res.data.address);
      })
      .catch((err) => {
        console.error(err);
        console.log("실패");
      });
    setMenu("등록된 상품");
  }, []);

  const editUser = async (e) => {
    e.preventDefault();
    const oldnickname = data.nickname;
    const nickname = e.target.nickname.value; // 값이 없을 때 빈 문자열로 설정
    const about = e.target.about.value;
    const address = e.target.address.value;
    const _id = getCookie("login");
    const fromdata = new FormData();

    console.log(nickname);
    fromdata.append("nickname", nickname);
    fromdata.append("about", about);
    fromdata.append("address", address);
    fromdata.append("profileIMG", prewviewimg);
    fromdata.append("oldnickname", oldnickname);
    fromdata.append("_id", _id);

    if (nickname === "") {
      alert("닉네임을 입력해주세요!");
    } else {
      await axios
        .post(`${API_URL}/user/edit`, fromdata)
        .then((result) => {
          if (result.data === "닉네임중복") {
            alert("누군가 사용중인 닉네임 입니다.");
          } else {
            setData(result.data);
            setModal(false);
          }
        })
        .catch(() => {});
    }
  };

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

  const handleAddressClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = `${data.address} ${data.buildingName || ""}`;
        setSelectedAddress(fullAddress);
      },
    }).open();
  };

  const MenuClick = (selectMenu) => {
    setMenu(selectMenu);
  };

  useEffect(() => {
    const body = document.body;

    if (modal) {
      body.style.overflow = "hidden"; // 모달이 열릴 때 스크롤 방지
    } else {
      body.style.overflow = "auto"; // 모달이 닫힐 때 스크롤 복원
    }
    return () => {
      body.style.overflow = "auto"; // 컴포넌트가 언마운트될 때 스크롤 복원
    };
  }, [modal]);

  return (
    <div>
      <div
        className="mypage_modalBg"
        style={modal ? { display: "flex" } : { display: "none" }}
        >
        <form onSubmit={editUser} id="JSW_modalALL">
          <div className="JSW_modal_loginCloseBtn">
            <div className="JSW_modal_mainTitle">프로필 수정</div>
            <i
              onClick={() => {
                setModal(false);
              }}
              class="fa-solid fa-xmark"
            ></i>
          </div>
          <div className="JSW_modal_loginInputBox">
            <input
              name="profileIMG"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImage(null);
                if (e.target.files.length === 0) {
                  console.log("어림도 없다");
                } else {
                  setpreviwimg(e.target.files[0]);
                }
              }}
              style={{ display: "none" }}
            ></input>
            <div
              className="JSW_modal_imgpreview"
              onClick={() =>
                document.getElementsByName("profileIMG")[0].click()
              }
            >
              <img
                src={
                  profileIMG
                    ? data.profileIMG
                    : URL.createObjectURL(prewviewimg)
                }
              ></img>
            </div>
            <div className="JSW_modal_selectform">
              <div>
                <div className="JSW_modal_formtitle">닉네임</div>
                <input
                  className="JSW_modal_loginInputBox_s"
                  id="nickname"
                  type="text"
                  defaultValue={data.nickname}
                  placeholder="별명을 정해주세요."
                ></input>
              </div>
              <div>
                <div className="JSW_modal_formtitle">배송지</div>
                <input
                  style={{ cursor: "pointer" }}
                  className="JSW_modal_loginInputBox_s JSW_modal_addinput"
                  id="address"
                  type="text"
                  value={selectedAddress}
                  onClick={handleAddressClick}
                ></input>
              </div>
            </div>
          </div>
          <div className="JSW_modal_about">
            <div className="JSW_modal_formtitle">소개글</div>
            <textarea
              className="JSW_modal_loginInputBox_s"
              id="about"
              type="text"
              defaultValue={data.about}
              placeholder="상점 설명을 적어주세요."
            ></textarea>
          </div>
          <div className="JSW_modalsetbutnBox">
            <button type="submit" className="JSW_mypagewater">
              수정 완료
            </button>
          </div>
        </form>
      </div>

      <div className="JSW_container">
        <div className="JSW_mypage_title">마이페이지</div>
        <div className="JSW_Main">
          <div className="JSW_Sec1">
            <div className="JSW_menubar">
              <nav className="JSW_nav1">
                <span id="JSW_Mypage_tag"></span>
                <ul>
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
                      className={menu === "찜 목록" ? "active" : "noactive"}
                      onClick={() => MenuClick("찜 목록")}
                    >
                      찜 목록
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      className={menu === "후기" ? "active" : "noactive"}
                      onClick={() => MenuClick("후기")}
                    >
                      상점 후기
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      className={menu === "계정 탈퇴하기" ? "active1" : "noactive1"}
                      onClick={() => MenuClick("계정 탈퇴하기")}
                    >
                      계정 탈퇴하기
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
                    <div>내정보</div>
                    <div className="JSW_btnBox">
                      <Link
                        className="loginBtn"
                        style={{ textDecoration: "none" }}
                        onClick={(e) => {
                          e.preventDefault();
                          setModal(true);
                        }}
                      >
                        <label className="JSW_Cristal2">프로필 수정</label>
                      </Link>
                      <Link
                        to="/makenewpw"
                        className="loginBtn"
                        style={{ textDecoration: "none" }}
                      >
                        <label className="JSW_Cristal">비밀번호 변경</label>
                      </Link>
                    </div>
                  </div>
                  <div className="JSW_userlist">이름 : {data.real_name}</div>
                  <div className="JSW_userlist">별명 : {data.nickname}</div>
                  <div className="JSW_userlist">
                    전화번호 : {data.phone_number}
                  </div>
                  <div className="JSW_userlist">이메일 : {data.email}</div>
                  <div className="JSW_userlist">주소지 : {data.address}</div>
                </div>
              </div>
              <div className="JSW_useraboutbox">
                <div>소개글 :</div>
                <div className="JSW_userabout">{data.about}</div>
              </div>
            </div>

            <div className="JSW_Sec2-2">
              {menu === "등록된 상품" && (
                <Registered menu={menu} data={data}></Registered>
              )}
              {menu === "찜 목록" && (
                <div>
                  <Picklist menu={menu}></Picklist>
                </div>
              )}
              {menu === "후기" && (
                <div>
                  <Mypagehoogi menu={menu}></Mypagehoogi>
                </div>
              )}
              {menu === "계정 탈퇴하기" && (
                <div>
                  <Withdraw menu={menu}></Withdraw>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;