import './main.css'
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/contansts';


function Main(){

  const fectchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}`);
      console.log('상품 데이터 조회 완료');
      console.log(res.data)
    } catch (error) {
      console.log('데이터 조회 실패');
      console.log(error) 
    }
  };
  useEffect(() => {
    fectchProduct();
  }, []);

  return(
    <div>
      test
      {/* <div><Link to='/detail'>상세페이지</Link></div> */}
      <div className='KJH_product_1'>
        <Link to={`/detail/`}>첫 번째 상품</Link>
      </div>
    </div>
  )
};

export default Main;