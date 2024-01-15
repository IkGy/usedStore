import './test.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/contansts'; 

function Test() {

    const [product, setProduct] = useState([]);

    const fectchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/test`);
        console.log('상품 데이터 조회 완료');
        setProduct(res.data);
        
      } catch (error) {
        console.log('데이터 조회 실패');
        console.log(error);
      }
    };
    useEffect(() => {
      fectchProduct();
    }, []);

    return (
        <>
            <h1>데이터 테스트</h1>
            {product.map((item, index) => (
                <div key={item.id} className='KJH_testpage_container'>
                    <div>----------------------------------------------------------------</div>
                    <div><h2>{index + 1}번 상품</h2></div>
                    <div>판매자 : {item.seller}</div>
                    <div>구매자 : {item.buyer}</div>
                    <div>카테고리 : {item.category}</div>
                    <div>판매 제목 : {item.title}</div>
                    <div>판매 내용 : {item.comment}</div>
                    <div>상품 상태 : {item.product_staus}</div>
                    <div>환불 가능여부 : {item.refund}</div>
                    <div>가격 : {item.price}</div>
                    <div>거래 지역 : {item.locaion}</div>
                    <div>태그 : {item.tags}</div>
                    <div>수량 : {item.count}</div>
                    <div>이미지 : {item.images}</div>
                    <div>판매 여부 (상태) : {item.status}</div>
                    <div>상품 작성 날짜 : {item.created_at}</div>
                    <div>상품 수정 날짜 : {item.updated_at}</div>
                    <div>거래 방법 : {item.order_type}</div>
                    <div>----------------------------------------------------------------</div>
                </div>
            ))}
        </>
    )
}

export default Test;