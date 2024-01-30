import { getCookie } from "../../useCookies";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config/contansts";
import axios from "axios";
import { Link } from "react-router-dom";
import nohoogi from "./image/71583.png";


function Mypagehoogi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/review/mypagehoogi`, {
        params: { id: getCookie("login") },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log("실패");
      });
  }, []);

  // 현재 날짜를 가져오는 함수
  const getCurrentDate = () => {
    const now = new Date();
    return now;
  };

  // 작성일을 오늘 날짜를 기준으로 몇 일 전 또는 개월 년도로 변환하는 함수
  const formatUpdateDate = (updateDate) => {
    const currentDate = getCurrentDate();
    const updatedDate = new Date(updateDate);
    const timeDiff = Math.abs(currentDate - updatedDate);
    const daysAgo = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysAgo < 30) {
      return `${daysAgo}일 전`;
    } else if (daysAgo < 365) {
      const monthsAgo = Math.floor(daysAgo / 30);
      return `${monthsAgo}개월 전`;
    } else {
      const yearsAgo = Math.floor(daysAgo / 365);
      return `${yearsAgo}년 전`;
    }
  };

  return (
    <div className="JSW_picklist">
      <div className="JSW_picklistname">
        구매 후기 <span>({data.length})</span>
      </div>
      {data.length === 0 ? (
        <div className="JSW_nohoogibox">
          <img src={nohoogi}></img>
          <div>아직 등록된 후기가 없습니다.</div>
        </div>
      ) : (
        <div>
          {data.map((data, i) => {
            return (
              <div key={data.id} className="CHM_hoogiBox">
                <div className="JSW_profile_hoogi">
                  <img src={data.profileIMG}></img>
                </div>
                <div className="JSW_hoogiflex">
                  <div className="JSW_writer_hoogi">{data.writer}</div>
                  <div className="JSW_date_hoogi">
                    {formatUpdateDate(data.update_at)}
                  </div>
                </div>

                <div></div>
                <div className="JSW_comment_hoogi">{data.comment}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Mypagehoogi;
