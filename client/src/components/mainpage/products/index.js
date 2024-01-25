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

function Products() {
  const [prod, setProd] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(8); // 초기에 표시되는 상품 수

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/prod`);
      console.log("상품 데이터 조회 완료");
      console.log(res.data);
      const shuffledProducts = shuffleArray(res.data);
      console.log(shuffledProducts);
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
    setDisplayedProducts(displayedProducts + 4); // 4개씩 상품 수를 증가
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
                    {data.price} 원<span>{data.date}</span>
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