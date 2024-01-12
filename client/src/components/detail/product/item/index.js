import './item.css';

import NextBTN from './images/next_btn.png';
import Heart from './images/heart.png';
import Check from './images/check.png';
import Time from './images/time.png';
import Report from './images/report.png';
import HeartIcon from './images/hearticon.png';
import Talk from './images/talk.png';
import Blog from './images/blog.png';
import FaceBook from './images/facebook.png';
import X from './images/x.png';
import Url from './images/url.png';

import One from './images/1.png';
import Two from './images/2.png';
import Three from './images/3.png';

// 가격 형식화
function formatPrice(price) {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', currencyDisplay: 'code' })
    .format(price)
    .replace('KRW', ''); // 'KRW' 문자열 제거
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
    // console.log(props.info)
    const Info = props.info
    const Like = props.heart
    
    // 생성 날짜 형식화
    const formattedCreatedAt = formatTimeAgo(Info.created_at);

    console.log(Info);
    console.log(Like);

    // 가격 형식화 적용
    const formattedPrice = Info.price ? formatPrice(Info.price) : '가격 정보 없음';

    return (
        <>
            <div className='KJH_item_section'>
                {/* 이미지 관련 */}
                <div className='KJH_item_image_section'>
                    <div className='KJH_item_image_info'>
                        <div className='KJH_item_images'>
                            <img src={One} alt='image_1'/>
                            <img src={Two} alt='image_2'/>
                            <img src={Three} alt='image_3'/>
                        </div>
                        <button direction="next" className='KJH_item_next_image_btn'>
                            <img src={NextBTN} alt='next-btn'/>
                        </button>
                    </div>
                </div>
                {/* 상품 정보 */}
                <div className='KJH_item_info_section'>
                    <div className='KJH_item_info'>
                        <div className='KJH_item_info_top'>
                            <div className='KJH_item_title_section'>
                                <div className='KJH_item_title_name'>
                                    {Info.title}
                                </div>
                                <div className='KJH_item_title_price_section'>
                                    <div className='KJH_item_title_price_info'>
                                        {/* 가격 데이터 */}
                                        {formattedPrice}
                                        <span>원</span>
                                    </div>
                                </div>
                            </div>
                            <div className='KJH_item_info_detail_section'>
                                <div className='KJH_item_info_detail_info'>
                                    <div className='KJH_item_info_detail_status'>
                                        <div className='KJH_item_info_detail_status_icon'>
                                            <img src={Heart} alt='heart' width='16px' height='16px' />
                                        </div>
                                        <div className='KJH_item_info_detail_status_num'>
                                            {/* 찜 데이터 */}
                                            {Like.length}
                                        </div>
                                        <div className='KJH_item_info_detail_status_icon'>
                                            <img src={Check} alt='heart' width='21px' height='13px' />
                                        </div>
                                        <div className='KJH_item_info_detail_status_num'>
                                            {/* 조회수 데이터 */}
                                            447
                                        </div>
                                        <div className='KJH_item_info_detail_status_icon'>
                                            <img src={Time} alt='heart' width='16px' height='16px' />
                                        </div>
                                        <div className='KJH_item_info_detail_status_num'>
                                            {/* 시간 데이터 */}
                                            {formattedCreatedAt}전
                                        </div>
                                    </div>
                                    <button className='KJH_item_info_report'>
                                        <img src={Report} alt='report' width='15px' height='15px' />
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
                                            사용감 적음
                                        </div>
                                    </div>
                                    <div className='KJH_item_info_status_info'>
                                        <div className='KJH_item_info_item_status_title'>
                                            - 교환여부
                                        </div>
                                        <div className='KJH_item_info_item_status'>
                                            {/* 교환여부 데이터 */}
                                            교환불가능
                                        </div>
                                    </div>
                                    <div className='KJH_item_info_status_info'>
                                        <div className='KJH_item_info_item_status_title'>
                                            - 배송비
                                        </div>
                                        <div className='KJH_item_info_item_status'>
                                            {/* 배송비 데이터 */}
                                            배송비 별도
                                        </div>
                                    </div>
                                    <div className='KJH_item_info_status_info'>
                                        <div className='KJH_item_info_item_status_title'>
                                            - 거래지역
                                        </div>
                                        <div className='KJH_item_info_item_status'>
                                            {/* 거래지역 데이터 */}
                                            경기 평택시 장안웃길 56 국제대학교
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 찜 / 실시간 메세지 / 바로구매 버튼 */}
                            <div className='KJH_item_btn_section'>
                                <div className='KJH_item_btn_select_section'>
                                    <button className='KJH_item_btn_select_status'>
                                        <img src={HeartIcon} alt='heart' width='18px' height='18px'/>
                                        <span>찜</span>
                                        {/* 해당 상품 찜 개수 데이터 */}
                                        <span>{Like.length}</span>
                                    </button>
                                </div>
                                <div className='KJH_item_btn_select_section'>
                                    <button className='KJH_item_btn_select_talk'>
                                        <img src={Talk} alt='talk' width='18px' height='18px'/>
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
            <div className='KJH_item_share_section'>
                <button type='button' className='KJH_item_share_btn_naverblog'>
                    <img src={Blog} alt='네이버블로그 아이콘' width='22px' height='18px'/>
                </button>
                <button type='button' className='KJH_item_share_btn_facebook'>
                    <img src={FaceBook} alt='페이스북 아이콘' width='8px' height='15px'/>
                </button>
                <button type='button' className='KJH_item_share_btn_x'>
                    <img src={X} alt='X 아이콘' width='25px' height='25px'/>
                </button>
                <button type='button' className='KJH_item_share_btn_url'>
                    <img src={Url} alt='url 공유 아이콘' width='25px' height='25px'/>
                </button>
            </div>
        </>
    )
}

export default Item;