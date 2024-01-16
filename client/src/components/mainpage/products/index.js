import React, { useState } from "react";
import testImg from './245041282_1_1704816568_w856.jpg'
import './prod.css'

function Products() {
  const [prod, setProd] = useState([
    {id:1, title: "제목입니다.1dddddddddddddddddddd", image: testImg, price:13000,date:"1일전"},
    {id:2, title: "제목입니다.2", image: testImg, price:13000,date:"1일전"},
    {id:3, title: "제목입니다.3", image: testImg, price:13000,date:"1일전"},
    {id:4, title: "제목입니다.4", image: testImg, price:13000,date:"1일전"},
    {id:5, title: "제목입니다.5", image: testImg, price:13000,date:"1일전"},
    {id:6, title: "제목입니다.6", image: testImg, price:13000,date:"1일전"},
  ]);

  return(
    <div className="main_prod_grid">
      {prod.map((data)=>(
          <div className="main_prod_detail">
            <div className="main_prod_img">
              <img className="main_prod_image" src={data.image}></img>
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