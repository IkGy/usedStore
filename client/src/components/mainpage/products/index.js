import React, { useState, useEffect } from "react";
import "./prod.css";
import { API_URL } from "../../config/contansts";
import axios from "axios";
import { Link } from "react-router-dom";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// 날짜 차이를 계산하여 표시하는 함수
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const timeDifference = now - date;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds}초 전`;
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (days < 30) {
    return `${days}일 전`;
  } else if (months < 12) {
    return `${months}개월 전`;
  } else {
    return `${years}년 전`;
  }
};

function Products() {
  const [prod, setProd] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(12);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/prod`);
      const shuffledProducts = shuffleArray(res.data);
      setProd(shuffledProducts);
    } catch (error) {
      console.log("데이터 조회 실패");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleLoadMore = () => {
    setDisplayedProducts(displayedProducts + 8);
  };

  return (
    <>
      <div className="prod_title">
        <p>오늘의 추천상품</p>
      </div>
      <div className="main_prod_grid">
        {prod.length > 0 &&
          prod.slice(0, displayedProducts).map((data) => (
            <Link to={`/detail/${data._id}`} key={data._id}>
              <div className="main_prod_detail">
                <div className="main_prod_img">
                  <img className="main_prod_image" src={data.images[0]} alt={data.title} />
                </div>
                <div className="main_prod_info">
                  <p className="main_prod_title">{data.title}</p>
                  <p className="main_prod_price">
                    {data.price} 원<span>{formatTimeAgo(data.created_at)}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div className="plus_btn">
        {displayedProducts < prod.length && (
          <button onClick={handleLoadMore} className="load_more_button btn_1">
            더 보기
          </button>
        )}
      </div>
    </>
  );
}

export default Products;