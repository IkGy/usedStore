import { getCookie } from "../../useCookies";
import { API_URL } from '../config/contansts';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Modal from './shopmodal';
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
  const [reviewUpdated, setReviewUpdated] = useState(false);
  const [reviewContent, setReviewContent] = useState('');

  // 모달창 관리
  const [modalOpen, setModalOpen] = useState(false); // 모달창 관리

  // 모달창 열기
  function openModal() {
    const userId = getCookie('login'); // 현재 로그인한 사용자의 ID
  
    if (userId) {
      if (userId === useId.id) {
        alert('본인 후기는 작성할 수 없습니다');
        return; // 함수 실행 중지
      }
  
      // 후기 중복 검사
      const hasReviewed = getReview.some(review => review.write_id === userId);
      if (hasReviewed) {
        alert('후기는 중복으로 작성할 수 없습니다');
        return; // 함수 실행 중지
      }
  
      setReviewContent('');
      setModalOpen(true);
    } else {
      alert('후기등록을 위해 로그인 해주시기 바랍니다');
      navigate('/login');
    }
  }
  
  
  // 모달창 닫기
  function closeModal() {
    setModalOpen(false);
    setReviewContent('');
  }

  useEffect(() => {
    const fetchGetReview = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/mypageview/${useId.id}`);
        
        setGetReview(res.data.review);
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다:', error.response?.data);
      }
    };
    fetchGetReview();
  }, [reviewUpdated]);

  const updateReviewData = () => {
    setReviewUpdated(prev => !prev); // 상태를 변경하여 useEffect 트리거
};


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

  return (
    <>
      <div className="KJH_shop-review_container">
        <div className="KJH_shop-review_main">
          <div className="KJH_shop-review_main_info">
            상점후기
          </div>
          <div className="KJH_shop-review_post">
            <div
              onClick={openModal}
              style={{ cursor: 'pointer' }}
            >
              후기 등록
            </div> {/* 모달 열기 버튼 */}
            <Modal
              show={modalOpen}
              onClose={closeModal}
              updateReviewData={updateReviewData}
              setModalOpen={setModalOpen}
              reviewContent={reviewContent}
              setReviewContent={setReviewContent} 
            />
          </div>
        </div>
        {getReview.length === 0 ? (
          <div className="KJH_shop-review_no-review">
            상점 후기가 없습니다. 후기를 작성해주세요!
          </div>
        ) : (
          getReview.map((review) => (
            <div className="KJH_shop-review_info" key={review._id}>
              <div className="KJH_shop-review_writer_section">
                <div className="KJH_shop-review_img">
                  <img src={review.profileIMG} alt="profile_img" />
                </div>
                <div className="KJH_shop-review_img_right_section">
                  <div className="KJH_shop-review_writer">
                    {review.writer}
                  </div>
                  <div className="KJH_shop-review_date">
                    {formatDate(review.update_at)} 
                  </div>
                </div>

              </div>
              <div className="KJH_shop-review_comment">
                {review.comment}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
  
}

export default Hoogi;