import React, { useEffect, useState } from 'react';
import './overview.css';
import { API_URL } from '../../../config/contansts';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";

import { GoHeartFill } from "react-icons/go";
import { FaClock } from "react-icons/fa6";

import { MdReport } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";


import { FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { getCookie } from '../../../../useCookies';

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
    const navigate = useNavigate();
    const { id } = useParams();
    const [like, setLike] = useState(false);
    const [likecount, setLikeCount] = useState(props.heart)

    useEffect(() => {
        const fetchlike = async () => {
            try {
                const res = await axios.get(`${API_URL}/prod/like/check`, {params: {userid: getCookie('login'), prodid: id}});
                setLike(res.data);
            } catch (error) {
                console.error('조회 에러', error);
            }
        };
    
        fetchlike();
    }, [id]);
    
    useEffect(() => {
        const getlikecount = async () => {
            try {
                const res = await axios.get(`${API_URL}/prod/like/getlike`, {params: {prodid: id}})
                setLikeCount(res.data);
            } catch (error) {
                console.error('찜하기 조회 에러')
            }
        }
    
        getlikecount();
    }, [like, id]);

    const toggleLike = async () => {
        if (getCookie('login')){
            try {
                if (like) {
                    // 찜 삭제
                    await axios.delete(`${API_URL}/prod/like/remove`, {params: {userid: getCookie('login'), prodid: id}});
                } else {
                    // 찜 추가
                    await axios.post(`${API_URL}/prod/like/add`, {userid: getCookie('login'), prodid: id});
                }
                setLike(!like); // 찜 상태 토글

            } catch (error) {
                console.error('toggle 기능 에러:', error);
            }
        } else {
            navigate('/login');
        }
    };

    // 채팅방 조회
    const [openChattingroom, setOpenChattingRoom] = useState([]);
    const curUser = getCookie('login');
    const selUser = props.seller._id;
    console.log("curUser: ", curUser);
    console.log("selUser: ", selUser);

    const openChatting = async () => {
        if (curUser){
            try {
                const res = await axios.post(`${API_URL}/chat/open_chat`, {
                    user: [selUser, curUser]
                    // seller: selUser,
                    // buyer: curUser
                });
                console.log(res.data);
            } catch (error) {
                console.error("채팅방을 불러오지 못했습니다");
            }
        } else {
            navigate('/login');
        }    
    };
    

    // 신고 알림창
    const handleReportClick = () => {
        alert('신고 페이지로 이동합니다.');
    };


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
    
    // 생성 날짜 형식화`
    const formattedCreatedAt = formatTimeAgo(Info.created_at);

    return (
        <>
            <div className='KJH_item_section'>

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
                                        {likecount.length}
                                    </div>
                                    <div className='KJH_item_info_detail_status_icon'>
                                        <FaClock />
                                    </div>
                                    <div className='KJH_item_info_detail_status_num'>
                                        {/* 시간 데이터 */}
                                        {formattedCreatedAt}전
                                    </div>
                                </div>
                                <button className='KJH_item_info_report' onClick={handleReportClick}>
                                    <MdReport />
                                <Link to={`/singo/${id}`}><div className='KJH_item_info_report_text'>신고하기</div></Link>
                                </button>
                                </div>
                                <div className='KJH_item_info_status_section'>
                                    <div className='KJH_item_info_status_info'>
                                        <div className='KJH_item_info_item_status_title'>
                                            상품상태
                                        </div>
                                        <div className='KJH_item_info_item_status'>
                                            {/* 상품상태 데이터 */}
                                            {Info.product_status}
                                        </div>
                                    </div>
                                    <div className='KJH_item_info_status_info'>
                                        <div className='KJH_item_info_item_status_title'>
                                            환불 여부
                                        </div>
                                        <div className='KJH_item_info_item_status'>
                                            {/* 교환여부 데이터 */}
                                            {Info.refund ? '환불 불가능' : '환불 가능'}
                                        </div>
                                    </div>
                                    <div className='KJH_item_info_status_info_share'>
                                        <div className='KJH_item_info_status_title_section'>
                                            <div className='KJH_item_info_item_status_title'>
                                                거래지역
                                            </div>
                                            <div className='KJH_item_info_item_status'>
                                                {/* 거래지역 데이터 */}
                                                {Info?.location?.split(" ").slice(0, 2).join(" ")}
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
                            {/* 찜 / 실시간 메세지 버튼 */}
                            <div className='KJH_item_btn_section'>
                                <div className={`KJH_item_like_section_${like ? 'true' : 'false'}`}>
                                    <FaHeart onClick={toggleLike} />
                                </div>
                                <div className='KJH_item_btn_select_section' onClick={openChatting}>
                                    <Link to ='/chat'>
                                        <div className='KJH_item_btn_select_talk'>
                                            <IoChatboxEllipsesOutline />
                                            <span>실시간 채팅</span>
                                        </div>
                                    </Link>
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