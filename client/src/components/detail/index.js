import './detail.css';

import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../config/contansts';

import Slide from './product/slide';
// import Category from './product/category';
import Info from './product/info';
import Overview from './product/overview';

function Detail() {
    const { id } = useParams();
    const [item, setItem] = useState([]); // 상품 정보들
    const [save, setSave] = useState([]); // 해당 상품을 찜한 개수
    const [userInfo, setUserInfo] = useState([]); // 판매자 정보 
    const [review, setReview] = useState([]); // 해당 상품을 리뷰한 유저의 리뷰정보
    const [products, setProducts] = useState([]); // 판매자가 등록한 상품들 정보 전부
    const [error, setError] = useState(false);  // 에러 상태 추가 

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${API_URL}/prod/detail/${id}`);
                if (res.data.product) {
                    setItem(res.data.product);
                    setSave(res.data.likes);
                    setUserInfo(res.data.user);
                    setReview(res.data.review);
                    setProducts(res.data.products);
                } else {
                    setError(true);  // 유효하지 않은 id에 대한 처리
                }
            } catch (error) {
                setError(true);  // 에러 처리
            }
        };
    
        fetchProduct();
    }, [id]);
    

    if (error) {
        return <Navigate to="/detail/error" />;
    }

    

    return (
        <>
            <div className='KJH_detail_container'>
                {/* <Category info={item} /> */}
                <div className='KJH_detail_slide_section'>
                    <Slide info={item} />
                    <Overview info={item} heart={save} />
                </div>
                <Info info={item} seller={userInfo} review={review} products={products}/>
            </div>
        </>
    );
}

export default Detail;
