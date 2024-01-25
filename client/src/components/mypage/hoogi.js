import { getCookie } from "../../useCookies";
import { API_URL } from '../config/contansts';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
// import "./picklist.css"

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
    <div className="JSW_picklist">
      <div className="JSW_picklistname">후기</div>
      <div className="JSW_conentGridBox">
        {getReview.map((review, i)=> {
          return(
            <div className="JSW_liststart_hoogi" key={review._id}>
              <Link to={`/detail/${review._id}`}>
                {/* <div className="JSW_contentGridBox_img">
                {review.images && review.images[0] && <img src={review.images[0]} width="100%" alt="Review" />}
                </div> */}
                <div className="JSW_hoogiGridBox_img">
                  <div className="JSW_Aname_hoogi">리뷰 작성자 : {review.writer}
                </div>
                </div>
                <div className="JSW_Aname_hoogi">후기 : {review.comment}</div>
                <div className="JSW_Aname_hoogi">작성일 : {review.update_at}</div>
              </Link>
            
            </div>
          )
        })}
      </div>
  </div>
  )
}

export default Hoogi