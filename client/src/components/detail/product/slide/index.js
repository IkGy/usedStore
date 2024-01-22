import './slide.css';

import Slider from "react-slick"; // 슬라이드 라이브러리

import { CiSquarePlus } from "react-icons/ci"; // 이미지 확대
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Slide(props) {

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

    const Info = props.info

    const sliderImage = Info?.images?.map((image, index) => (
        <div className="sliderImg" key={index}>
            <img src={image} alt={`Slide ${index}`} />
        </div>
    ));

    return (
        <>
            <div className="sliderContainer">
                <Slider {...sliderSettings}>
                    {sliderImage}
                </Slider>
                <div className='KJH_item_plus-image'>
                    <CiSquarePlus />
                </div>
            </div>
        </>
    )
}

export default Slide;