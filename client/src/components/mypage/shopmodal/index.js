import { API_URL } from '../../config/contansts';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './shopmodal.css';
import { getCookie } from '../../../useCookies';

function Modal({ show, onClose }) {
    const { id } = useParams();
    const [seller, setSeller] = useState('');
    const [reviewer, setReviewer] = useState('');

    
    useEffect(() => {
        // 판매자 닉네임을 조회함
        const fetchSeller = async () => {
            try {
                const res = await axios.get(`${API_URL}/mypage/post/shop/${id}`);
                setSeller(res.data.nickname);
            } catch (error) {
                console.log(error);
            }
        };

        // 리뷰 작성자의 정보를 조회함
        const fetchReviewer = async () => {
            try {
                const reviewe = await axios.get(`${API_URL}/mypage/post`, {params:{id:getCookie('login')}});
                setReviewer(reviewe.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (show) {
            fetchSeller();
            fetchReviewer();
        }
    }, [show, id]);

    const submitReview = async (resiverId, writerId, reviewContent) => {
        try {
            const url = `${API_URL}/mypage/post/shop/${resiverId}`;
            
            const requestBody = {
                writerid: writerId,
                content: reviewContent
            };
            const response = await axios.post(url, requestBody);
    
            console.log('응답 메시지:', response.data.message);
            return response.data;
        } catch (error) {
            console.error('후기 작성 에러:', error);
            throw error;
        }
    };

    const [reviewContent, setReviewContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const writerId = 'user123';
        await submitReview(id, writerId, reviewContent);
    };

    // 실시간 날짜와 시간계산
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${year}년 ` +
        `${month.toString().padStart(2, '0')}월 ` +
        `${day.toString().padStart(2, '0')}일 ` +
        `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}`;
    };

    if (!show) return null;

    return (
        <div className="KJH_shop-review_modal" onClick={onClose}>
            <div className="KJH_shop-review_modal-content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className='KJH_shop-review_modal_section'>
                        <div className='KJH_shop-review_modal_info'>
                            <div className='KJH_shop-review_modal_in'>
                                <div className='KJH_shop-review_modal_title_section'>
                                    <div className='KJH_shop-review_modal_title'>
                                        후기 등록하기
                                    </div>
                                    <div className='KJH_shop-review_modal_who-shop_section'>
                                        <div className='KJH_shop-review_modal_nickname'>
                                            {seller}
                                        </div>
                                        <div className='KJH_shop-review_modal_ex_name'>
                                            님의 상점
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='KJH_shop-review-modal_content'>
                                    <textarea 
                                        value={reviewContent} 
                                        onChange={(e) => setReviewContent(e.target.value)}
                                        placeholder="후기를 작성해주세요"
                                    />
                                </div>
                                <div className='KJH_shop-review_modal_bottom_section'>
                                    <div className='KJH_shop-review_modal_bottom_date_section'>
                                        <div>
                                            <div className='KJH_shop-review_modal_date_title'>
                                                작성시간 :
                                            </div>
                                            <div className='KJH_shop-review_modal_date_content'>
                                                {formatDate(currentDate)}
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className='KJH_shop-review_modal_submit'>
                                        등록하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <button className="KJH_shop-review_close-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}

export default Modal;