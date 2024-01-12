import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { API_URL } from '../config/contansts';
import axios from 'axios';

import Category from './product/category';
import Info from './product/info';
import Item from './product/item';

function Detail() {
    const { id } = useParams();

    const fectchProduct = async () => {
        try {
            const res = await axios.get(`${API_URL}/detail/${id}`);
            console.log('조회 완료');
            console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fectchProduct();
    }, []);

    return (
        <>
            <Category />
            <Item />
            <Info />
        </>
    );
}

export default Detail;