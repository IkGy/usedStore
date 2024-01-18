import React, { useState } from 'react';
import './item.css';
import { GoHeartFill } from "react-icons/go";
import { IoIosEye } from "react-icons/io";
import { FaClock } from "react-icons/fa6";

import { MdReport } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";


import { FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

// 이전, 다음 이미지
import { FaArrowAltCircleLeft } from "react-icons/fa"; // 이전 이미지
import { FaArrowAltCircleRight } from "react-icons/fa"; // 다음 이미지

// 임시 이미지
import Car1 from './images/car1.png';
import Car2 from './images/car2.png';
import Car3 from './images/car3.png';


// 가격 형식화
function formatPrices(data) {
    const formatter = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', currencyDisplay: 'code' });

    return {
        ...data, // 기존 데이터를 그대로 유지
        price: formatter.format(data.price).replace('KRW', ''), // 가격 형식화
        delivery_price: formatter.format(data.delivery_price).replace('KRW', '') // 배송비 형식화
    };
}

// 시간 계산
function formatTimeAgo(createdDate) {
    const created = new Date(createdDate);
    const now = new Date();
    const diff = now - created;

    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diff / (1000 * 60)) % 60);

    let formattedTime = '';

    if (diffDays > 0) {
        formattedTime += `${diffDays}일 `;
    }
    if (diffHours > 0 || diffDays > 0) { // 일이 있으면 시간도 표시
        formattedTime += `${diffHours}시간 `;
    }
    formattedTime += `${diffMinutes}분`;

    return formattedTime.trim();
}


function Item(props) {
    
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const handleCopyClipBoard = async () => {
        try {
            const urlToCopy = decodeURIComponent(window.location.href);
            await navigator.clipboard.writeText(urlToCopy);
            setShowCopyMessage(true);
            setTimeout(() => {
                setShowCopyMessage(false);
            }, 600);
        } catch (err) {
            console.log(err);
        }
    };

    console.log("aaaaaaaaaaaaa", props.info.images)
    const Info = props.info
    const Like = props.heart
    
    // 생성 날짜 형식화
    const formattedCreatedAt = formatTimeAgo(Info.created_at);

    // console.log(Info);
    // console.log(Like);

    // 가격 형식화 적용
    const formattedInfo = formatPrices(Info);

    // 슬라이더의 위치를 저장하는 state
    const [slidePosition, setSlidePosition] = useState('');

    // 슬라이더 위치를 변경하는 함수
    const handleSlideChange = (newPosition) => {
        const totalSlides = 4; // 전체 슬라이드 수 (추가된 이미지 포함)
        const slideWidth = 430; // 슬라이드 너비
    
        // 마지막 슬라이드에서 다음 버튼 클릭
        if (newPosition < -(totalSlides - 1) * slideWidth) {
            setSlidePosition(-slideWidth); // 첫 번째 실제 슬라이드로 이동
        } 
        // 첫 번째 슬라이드에서 이전 버튼 클릭
        else if (newPosition > -slideWidth) {
            setSlidePosition(-(totalSlides - 2) * slideWidth); // 마지막 실제 슬라이드로 이동
        } 
        else {
            setSlidePosition(newPosition);
        }
    };

    return (
        <>
            <div className='KJH_item_section'>
                {/* 이미지 관련 */}
                <div style={{ overflow: 'hidden' }} className='KJH_item-image_section'>
                    <div className='KJH_item_slide-container' style={{ transform: `translateX(${slidePosition}px)` }}>
                        <div className='KJH_item_slide-box'></div>
                            <img src={Car3} alt='car3'/>
                        <div className='KJH_item_slide-box'></div>
                            <img src={Car1} alt='car1'/>
                        <div className='KJH_item_slide-box'></div>
                            <img src={Car2} alt='car2'/>
                        <div className='KJH_item_slide-box'></div>
                            <img src={Car3} alt='car3'/>
                        <div className='KJH_item_slide-box'></div>
                            <img src={Car1} alt='car1'/>
                    </div>
                    <div className='KJH_item_slide_arrow_section'>
                        <button className='KJH_item_slide_left' onClick={() => handleSlideChange(slidePosition + 430)}>
                            <FaArrowAltCircleLeft />
                        </button>
                        <button className='KJH_item_slide_right' onClick={() => handleSlideChange(slidePosition - 430)}>
                            <FaArrowAltCircleRight />
                        </button>
                    </div>
                    
                    <div className='KJH_item_slide_images_section'>
                        <img src={Car1} alt='car1'/>
                        <img src={Car2} alt='car2'/>
                        <img src={Car3} alt='car3'/>
                    </div>
                </div>
                
                {/* 상품 정보 */}
                <div className='KJH_item_info_section'>
                    <div className='KJH_item_info'>
                        <div className='KJH_item_info_top'>
                            <div className='KJH_item_title_section'>
                                <div className='KJH_item_title_name'>
                                    {/* 상품 이름 */}
                                    {Info.title}
                                </div>
                                <div className='KJH_item_title_price_section'>
                                    <div className='KJH_item_title_price_info'>
                                        {/* 상품 가격 */}
                                        {Info.price}<span>원</span>
                                    </div>
                                </div>
                            </div>
                            <div className='KJH_item_info_detail_section'>
                                <div className='KJH_item_info_detail_info'>
                                    <div className='KJH_item_info_detail_status'>
                                        <div className='KJH_item_info_detail_status_icon'>
                                            <GoHeartFill />
                                        </div>
                                        <div className='KJH_item_info_detail_status_num'>
                                            {/* 찜 데이터 */}
                                            {Like.length}
                                        </div>
                                        <div className='KJH_item_info_detail_status_icon'>
                                            <IoIosEye />
                                        </div>
                                        <div className='KJH_item_info_detail_status_num'>
                                            {/* 조회수 데이터 */}
                                            447
                                        </div>
                                        <div className='KJH_item_info_detail_status_icon'>
                                            <FaClock />
                                        </div>
                                        <div className='KJH_item_info_detail_status_num'>
                                            {/* 시간 데이터 */}
                                            {formattedCreatedAt}전
                                        </div>
                                    </div>
                                    <button className='KJH_item_info_report'>
                                        <MdReport />
                                        <div className='KJH_item_info_report_text'>신고하기</div>
                                    </button>
                                </div>
                                <div className='KJH_item_info_status_section'>
                                    <div className='KJH_item_info_status_info'>
                                        <div className='KJH_item_info_item_status_title'>
                                            - 상품상태
                                        </div>
                                        <div className='KJH_item_info_item_status'>
                                            {/* 상품상태 데이터 */}
                                            {Info.product_status}
                                        </div>
                                    </div>
                                    <div className='KJH_item_info_status_info'>
                                        <div className='KJH_item_info_item_status_title'>
                                            - 환불 여부
                                        </div>
                                        <div className='KJH_item_info_item_status'>
                                            {/* 교환여부 데이터 */}
                                            {Info.refund ? '환불 불가능' : '환불 가능'}
                                        </div>
                                    </div>
                                    <div className='KJH_item_info_status_info_share'>
                                        <div className='KJH_item_info_status_title_section'>
                                            <div className='KJH_item_info_item_status_title'>
                                                - 거래지역
                                            </div>
                                            <div className='KJH_item_info_item_status'>
                                                {/* 거래지역 데이터 */}
                                                {Info.location}
                                            </div>
                                        </div>
                                        <div>
                                            <div className='KJH_item_info_share_section'>
                                                <FaArrowUpRightFromSquare onClick={() => handleCopyClipBoard(window.location.href)} />
                                                <div className={`KJH_item_info_shear_link fadeInOut ${showCopyMessage ? 'show' : ''}`}>
                                                    주소복사완료
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 찜 / 실시간 메세지 / 바로구매 버튼 */}
                            <div className='KJH_item_btn_section'>
                                <div className='KJH_item_like_section'>
                                    <FaHeart />
                                </div>
                                <div className='KJH_item_btn_select_section'>
                                    <button className='KJH_item_btn_select_talk'>
                                        <IoChatboxEllipsesOutline />
                                        <span>실시간 채팅</span>
                                    </button>
                                </div>
                                <div className='KJH_item_btn_select_section'>
                                    <button className='KJH_item_btn_select_buy'>
                                        <span>바로구매</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item;