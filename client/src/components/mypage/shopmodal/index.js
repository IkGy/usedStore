import { API_URL } from '../../config/contansts';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './shopmodal.css';

function Modal({ show, onClose }) {
    const { id } = useParams();
    const [seller, setSeller] = useState('');

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const res = await axios.get(`${API_URL}/mypage/post/shop/${id}`);
                setSeller(res.data.nickname);
            } catch (error) {
                console.log(error);
            }
        };
        if (show) {
            fetchSeller();
        }
    }, [show, id]);

    if (!show) return null;

    return (
        <div className="KJH_shop-review_modal" onClick={onClose}>
            <div className="KJH_shop-review_modal-content" onClick={e => e.stopPropagation()}>
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
                                테스트
                            </div>
                            <div className='KJH_shop-review_modal_bottom_section'>
                                <div className='KJH_shop-review_modal_bottom_date_section'>
                                    <div>
                                        <div className='KJH_shop-review_modal_date_title'>
                                            작성시간 :
                                        </div>
                                        <div className='KJH_shop-review_modal_date_content'>
                                            2024년 01월 26일 (금) 20:30:02
                                        </div>
                                    </div>
                                </div>
                                <div className='KJH_shop-review_modal_submit'>
                                    등록하기
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="KJH_shop-review_close-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}

export default Modal;