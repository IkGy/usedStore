import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/contansts';

import Category from './product/category';
import Info from './product/info';
import Item from './product/item';

function Detail() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${API_URL}/product/${id}`);
            setProduct(res.data)
        } catch (err) {
            console.error('해당 상품 정보를 불러오지 못했습니다.')
        }
    };
    useEffect(() => {
        fetchProduct();
    }, [id]);

    return (
        <>
            <Category />
            <Item />
            <Info />
        </>
    );
}

export default Detail;