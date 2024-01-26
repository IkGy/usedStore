import { getCookie } from "../../useCookies";
import { API_URL } from '../config/contansts';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import './hoogi.css';

// 날짜 계산
function formatDate(dateString) {
  // 문자열에서 연도, 월, 일 추출
  const dateParts = dateString.split('T')[0].split('-');
  const year = dateParts[0].substring(2); // 연도의 마지막 두 자리
  const month = dateParts[1]; // 월
  const day = dateParts[2]; // 일

  // yy년 mm월 dd일 형식으로 포맷
  return `${year}년 ${month}월 ${day}일`;
}


function Hoogi(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const useId = useParams();
  const [getReview, setGetReview] = useState([]);

  // console.log("test",useId);



  // useEffect(() => {
  //   axios.get(`${API_URL}/product/hoogi`,{params:{id:getCookie('login')}})
  //   .then((res) => {
  //     console.log("DB 조회 완료");
  //     console.log(res.data);
  //     setData(res.data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     console.log("실패");
  //   });
  // }, []);

  useEffect(() => {
    const fetchGetReview = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/mypageview/${useId.id}`);
        setGetReview(res.data.review);
        console.log("--------리뷰정보--------");
        console.log(res.data.review);
        console.log("----------------");
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다:', error.response?.data);
      }
    };
    fetchGetReview();
  }, []);


  const [end ,setEnd] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isInitialLoad) {
      setTimeout(() => {
        setEnd("end");
      }, 400);

      return () => {
        setEnd("end2");
      };
    } else {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);


  return(
    <>
      <div className="KJH_shop-review_container">
        <div className="KJH_shop-review_main">
          <div className="KJH_shop-review_main_info">
            상점후기
          </div>
        </div>
        {getReview.map((review) => (
          <div className="KJH_shop-review_info"  key={review._id}>
            <div className="KJH_shop-review_writer_section">
              <div className="KJH_shop-review_writer">
                {review.writer}
              </div>
              <div className="KJH_shop-review_date">
                {formatDate(review.update_at)} 
                {/* {review.update_at} */}
              </div>
            </div>
            <div className="KJH_shop-review_comment">
              {review.comment}
            </div>
          </div>
        ))}
        </div>
    </>
  )
}

export default Hoogi