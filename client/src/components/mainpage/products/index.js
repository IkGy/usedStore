import React, { useState, useEffect } from "react";
import testImg from "./245041282_1_1704816568_w856.jpg";
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
  const fectchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/prod`);
      console.log("상품 데이터 조회 완료");
      console.log(res.data);
      const shuffledProducts = shuffleArray(res.data);
      setProd(shuffledProducts);
    } catch (error) {
      console.log("데이터 조회 실패");
      console.log(error);
    }
  };
  useEffect(() => {
    fectchProduct();
  }, []);

  return (
    <div className="main_prod_grid">
      {prod.length > 0 &&
        prod.map((data) => (
          <Link to={`/detail/${data._id}`}>
            <div className="main_prod_detail">
              <div className="main_prod_img">
                <img className="main_prod_image" src={data.images[0]}></img>
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
  );
}

export default Products;
