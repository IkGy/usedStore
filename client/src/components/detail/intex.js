import './detail.css';

import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../config/contansts';

import Category from './product/category';
import Info from './product/info';
import Item from './product/item';

function Detail() {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [save, setSave] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [review, setReview] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);  // 에러 상태 추가

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
    useEffect(() => {
        fetchProduct();
    }, [id]);

    // 나중에 주석풀거임
    // 기능 : 존재하지 않는 상품일시 상품에러 페이지로 이동
    // if (error) {
    //     return <Navigate to="/detail/error" />;
    // }

    return (
        <>
            <div className='KJH_detail_container'>
                <Category info={item} />
                <Item info={item} heart={save} />
                <Info info={item} seller={userInfo} review={review} products={products}/>
            </div>
        </>
    );
}

export default Detail;
