import './main.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/contansts';


function Main(){

  const [product, setProduct] = useState([]);

  const fectchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}`);
      console.log('상품 데이터 조회 완료');
      setProduct(res.data);
      
    } catch (error) {
      console.log('데이터 조회 실패');
      console.log(error) 
    }
  };
  useEffect(() => {
    fectchProduct();
  }, []);

  // console.log(product[1]);

  
  return(
    <div>
      <Link to="/test"><h2 className='KJH_testpage'>테스트 페이지</h2></Link>
      {/* <div><Link to='/detail'>상세페이지</Link></div> */}
      
      {product.length > 0 && product.map((item, index) => (
        <div key={item.id}>
          <Link to={`/detail/${product[index]._id}`}>
            <div className='KJH_mainpage_list'>
              {item.title}
            </div>
          </Link>
        </div>
      ))}

      <div className='KJH_product_1'>
        {product.length > 0 && ( // 조건부 렌더링
          <Link to={`/detail/${product[1]._id}`}>첫 번째 상품</Link>
        )}
      </div>
    </div>
  )
};

export default Main;