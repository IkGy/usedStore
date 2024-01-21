import React, { useState } from 'react';
import './item.css';

import Slider from "react-slick"; // 슬라이드 라이브러리

import { CiSquarePlus } from "react-icons/ci"; // 이미지 확대
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GoHeartFill } from "react-icons/go";
import { IoIosEye } from "react-icons/io";
import { FaClock } from "react-icons/fa6";

import { MdReport } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";


import { FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

// 임시 이미지
import Car1 from './images/car1.png';
import Car2 from './images/car2.png';
import Car3 from './images/car3.png';


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
    
    // 주소 복사
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

    const Info = props.info
    console.log(Info);
    const Like = props.heart
    
    // 생성 날짜 형식화`
    const formattedCreatedAt = formatTimeAgo(Info.created_at);

    // 슬라이더 설정
    const sliderSettings = {
        dots: true,          // 스크롤바 아래 점으로 페이지네이션 여부
        infinite: true,      // 무한 반복
        speed: 1000,         // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
        autoplay: true,      // 자동 스크롤 사용 여부
        slidesToShow: 1,     // 한 화면에 보여질 컨텐츠 개수
        slidesToScroll: 1,   // 스크롤 한번에 움직일 컨텐츠 개수
        lazyLoad: true,
        arrows: true,        // 옆으로 이동하는 화살표 표시 여부
        pauseOnHover : true, // 슬라이드 이동시 마우스 호버하면 슬라이더 멈추게 설정
    };

    const sliderImage = Info?.images?.map((image, index) => (
        <div className="sliderImg" key={index}>
            <img src={image} alt={`Slide ${index}`} />
        </div>
    ));

    console.log(sliderImage);

    return (
        <>
            <div className='KJH_item_section'>

            
            <div className="sliderContainer">
                <Slider {...sliderSettings}>
                    {sliderImage}
                </Slider>
                <div className='KJH_item_plus-image'>
                    <CiSquarePlus />
                </div>
            </div>

            <div className='KJH_item_blur-background'>
                
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
                                    {Info?.price}<span>원</span>
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
                                    <div className='KJH_item_btn_select_talk'>
                                        <IoChatboxEllipsesOutline />
                                        <span>실시간 채팅</span>
                                    </div>
                                </div>
                                <div className='KJH_item_btn_select_section'>
                                    <div className='KJH_item_btn_select_buy'>
                                        <span>바로구매</span>
                                    </div>
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