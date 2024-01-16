import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { API_URL } from '../config/contansts';
import axios from 'axios';

import Category from './product/category';
import Info from './product/info';
import Item from './product/item';

function Detail() {
    const { id } = useParams();

    const [item, setItem] = useState([]);
    const [like, setLike] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [review, setReview] = useState([]);

    const fectchProduct = async () => {   
        try {
            const res = await axios.get(`${API_URL}/detail/${id}`);
            console.log('조회 완료');
            setItem(res.data.product);
            setLike(res.data.likes);
            setUserInfo(res.data.user);
            setReview(res.data.review);
            // console.log(res.data.product);
            // console.log(res.data.likes);
            // console.log(res.data.user);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fectchProduct();
    }, []);

    return (
        <>
            <Category info={item} />
            <Item info={item} heart={like} />
            <Info info={item} seller={userInfo} review={review} />
        </>
    );
}

export default Detail;