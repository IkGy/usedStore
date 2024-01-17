import React, { useState,useEffect } from "react";
import testImg from './245041282_1_1704816568_w856.jpg'
import './prod.css'
import { API_URL } from "../../config/contansts";
import axios from "axios";

function Products() {
  const [prod, setProd] = useState([]);
  const fectchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/prod`);
      console.log('상품 데이터 조회 완료');
      console.log(res.data);
      setProd(res.data);

    } catch (error) {
      console.log('데이터 조회 실패');
      console.log(error) 
    }
  };
  useEffect(() => {
    fectchProduct();
  }, []);

  return(
    <div className="main_prod_grid">
      {prod.map((data)=>(
          <div className="main_prod_detail">
            <div className="main_prod_img">
              <img className="main_prod_image" src={data.images}></img>
            </div>
            <div className="main_prod_info">
              <p className="main_prod_title">{data.title}</p>
              <p className="main_prod_price">{data.price} 원<span>{data.date}</span></p>
            </div>
          </div>
      ))}
    </div>
  )
}

export default Products;