import './info.css';
import { Link, Navigate } from 'react-router-dom';

// 카테고리 화살표
import { IoIosArrowForward } from "react-icons/io";

// 상품정보란 아이콘
import { FaLocationDot } from "react-icons/fa6";  // 거래지역 아이콘
import { BiSolidCategory } from "react-icons/bi"; // 카테고리 아이콘
import { IoMdPricetags } from "react-icons/io";   // 상품태그 아이콘

import { CiShop } from "react-icons/ci"; // 상점 아이콘


// 시간 계산
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    let diff = now - date;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    diff -= years * 1000 * 60 * 60 * 24 * 365;

    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    diff -= months * 1000 * 60 * 60 * 24 * 30;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    let result = "";
    if (years > 0) {
        result = `${years}년 전`;
    } else if (months > 0) {
        result = `${months}개월 전`;
    } else if (days > 0) {
        result = `${days}일 전`;
    } else {
        result = "오늘";
    }

    return result;
}

function Info(props) {

    const info = props.info;
    const seller = props.seller;
    const review = props.review;
    const products = props.products.filter((a) => a.status === "판매중");

    // 판매자의 최근에 게시한 상품 2개 뽑기
    const lastTwoProducts = products.slice(-2);


    if (!info || !seller || !review) {
        return <div>Loading...</div>;
    }

    

    return (
        <>
            <div className='KJH_if_section'>
                <div className='KJH_if_left_section'>
                    <div className='KJH_if_left_info'>
                        <div>
                            <div className='KJH_if_left_top_title'>
                                상품 정보
                            </div>
                            <div>
                                <div className='KJH_if_left_content_top'>
                                    {/* 판매자 상품 정보 설명 내용 데이터 */}
                                    {info.comment}
                                </div>
                                <div className='KJH_if_left_content_bottom'>
                                    <div className='KJH_if_left_content_div'>
                                        <div className='KJH_if_left_content_div_top'>
                                            <FaLocationDot />
                                            거래지역
                                        </div>
                                        <div className='KJH_if_left_content_div_center'>
                                            {/* 거래 지역 데이터 */}
                                            <div>{info.location}</div>
                                        </div>
                                    </div>
                                    <div className='KJH_if_left_content_div'>
                                        <div className='KJH_if_left_content_div_top'>
                                            <BiSolidCategory />
                                            카테고리
                                        </div>
                                        <div className='KJH_if_left_content_div_center'>
                                            <div className='KJH_if_left_content_div_link_span'>
                                                {info?.category?.[0] && (
                                                    <>
                                                        <Link to={`/detailsearch/${info.category[0]}`}>
                                                            {info.category[0]}
                                                        </Link>
                                                        {info?.category?.[1] && <IoIosArrowForward />}
                                                    </>
                                                )}
                                                {info?.category?.[1] && (
                                                    <>
                                                        <Link to={`/detailsearch/${info.category[1]}`}>
                                                            {info.category[1]}
                                                        </Link>
                                                        {info?.category?.[2] && <IoIosArrowForward />}
                                                    </>
                                                )}
                                                {info?.category?.[2] && (
                                                    <Link to={`/detailsearch/${info.category[2]}`}>
                                                        {info.category[2]}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='KJH_if_left_content_div'>
                                        <div className='KJH_if_left_content_div_top'>
                                            <IoMdPricetags />
                                            상품태그
                                        </div>
                                        <div className='KJH_if_left_content_div_bottom_tag_section'>
                                            {info.tags && info.tags.map((item) => (
                                                <Link to={`/search/${item}`} key={item}><div>#{item}&nbsp;</div></Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='KJH_if_left_bottom'>
                            <div className='KJH_if_left_bottom_title_section'>
                                {seller.nickname} 님의 최근에 올린 상품
                            </div>
                            <ul className='KJH_if_left_bottom_content_section'>
                                {lastTwoProducts.map((product, index) => (
                                    <li key={index} className={lastTwoProducts.length === 1 ? 'KJH_if_left_bottom_single-product' : ''}>
                                        <Link to={`/detail/${product._id}`} className='KJH_if_left_bottom_content_link_section'>
                                            <img src={product.images[0]} alt={product.title} />
                                            <div className='KJH_if_left_bottom_content_link_info'>
                                                <span className='KJH_if_left_bottom_content_link_price'>
                                                    {product.price}원
                                                </span>
                                                <span className='KJH_if_left_bottom_content_link_title'>
                                                    {product.title}
                                                </span>
                                                <span className='KJH_if_left_bottom_content_link_ad'>
                                                    #{product.tags[0]} #{product.tags[1]}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='KJH_if_right_section'>
                    <div className='KJH_if_right_info'>
                        <div className='KJH_if_right_top_section'>
                            <div className='KJH_if_right_top_title'>
                                상점정보
                            </div>
                            <div className='KJH_if_right_top_content_section'>
                                <Link to={`/mypageview/${seller._id}`} className='KJH_if_right_shop-link'>
                                    <div className='KJH_if_right_top_content_top'>
                                        {/* 판매자 상점으로 가는 링크 */}
                                        <div className='KJH_if_right_shop_icon'>
                                            <CiShop />
                                        </div>
                                        <div className='KJH_if_right_top_content_user_name'>
                                            {/* 해당 판매자 닉네임 데이터 + 판매자 정보로 가는 링크 데이터 */}
                                            <div className='KJH_if_right_top_seller'>{seller.nickname}</div>
                                            <div className='KJH_if_right_top_content_user_info'>
                                                {/* 해당 판매자가 판매하는 상품 개수 데이터 : 마이페이지 - 상품으로 연결*/}
                                                <div>
                                                    님의 판매중인 상품
                                                </div>
                                                <div className='KJH_if_right_top_prod_count'>
                                                    {products.length}
                                                </div>
                                                <div>
                                                    개
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className='KJH_if_right_top_content_user_review'>
                                    상점후기 <span>{review.length}</span>
                                </div>
                                {/* 상점 후기 */}
                                <div className='KJH_if_right_top_content_user_review_list_section'>
                                    <div className='KJH_if_right_top_content_user_no_review'>
                                        <div className='KJH_if_right_review_section'>
                                        {review.length > 0 ? (
                                            <>
                                            {review.slice(0, 2).map((r, index) => (
                                                <div className='KJH_if_right_review_info' key={index}>
                                                <div className='KJH_if_right_review_title'>
                                                    <div className='KJH_if_right_review_writer'>
                                                    리뷰 작성자 : {r.writer}
                                                    </div>
                                                    <div className='KJH_if_right_review_date'>
                                                    {formatDate(r.update_at)}
                                                    </div>
                                                </div>
                                                <div className='KJH_if_right_review_comment'>
                                                    {r.comment}
                                                </div>
                                                </div>
                                            ))}
                                            <Link to={`/mypageview/${seller._id}`}>
                                                <div className='KJH_if_right_review_more'>
                                                    상점후기 더보기
                                                </div>
                                            </Link>
                                            </>
                                        ) : (
                                            <Link to={`/mypageview/${seller._id}`}>
                                                <div className='KJH_if_right_review_more'>
                                                    <div>상점후기가 없습니다.</div>
                                                    <div>첫 후기를 작성해주세요!</div>
                                                </div>
                                            </Link>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='KJH_if_right_bottom_section'>
                                <button className='KJH_if_right_bottom_talk' >
                                    <div>실시간톡</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='KJH_if_section_bottom'>
                <div className='KJH_if_bottom_line'></div>
            </div>
        </>
    )
}

export default Info;