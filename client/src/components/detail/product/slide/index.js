import "./slide.css";
import Modal from "./modal";

import { useState } from "react";
import Slider from "react-slick"; // slick 슬라이드 라이브러리

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Slide(props) {
  const [modalOpen, setModalOpen] = useState(false); // 모달창 관리
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 URL 관리

  function openModal(imageUrl) {
    setSelectedImage(imageUrl); // 클릭된 이미지 URL 저장
    setModalOpen(true); // 모달창 열기
  }

  function closeModal() {
    setModalOpen(false); // 모달창 닫기
  }
  // 슬라이더 설정
  const sliderSettings = {
    dots: true, // 스크롤바 아래 점으로 페이지네이션 여부
    infinite: true, // 무한 반복
    speed: 1000, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
    autoplay: true, // 자동 스크롤 사용 여부
    slidesToShow: 1, // 한 화면에 보여질 컨텐츠 개수
    slidesToScroll: 1, // 스크롤 한번에 움직일 컨텐츠 개수
    lazyLoad: true,
    arrows: true, // 옆으로 이동하는 화살표 표시 여부
    pauseOnHover: true, // 슬라이드 이동시 마우스 호버하면 슬라이더 멈추게 설정
  };

  const Info = props.info;
  console.log("Info.status: ",Info.status);

  const sliderImage = Info?.images?.map((image, index) => (
    <div className="sliderImg" key={index} onClick={() => openModal(image)}>
      <img
        src={image}
        alt={`Slide ${index}`}
        style={Info.status === "판매중" ? { filter: "brightness(100%)" } : { filter: "brightness(40%)" }}
      />
    </div>
  ));

  return (
    <>
      <div className="sliderContainer">
        <Slider {...sliderSettings}>{sliderImage}</Slider>
        <Modal show={modalOpen} onClose={closeModal} image={selectedImage} />
      </div>
    </>
  );
}

export default Slide;
