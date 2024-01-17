import './main.css';
import { Link } from "react-router-dom";
import ImageSlide from "./imageSlide";
import AdComponent from "./advertCom";
import Products from "./products";

function Main(){
  return(
    <div>
      <div>
        <Link to="/test"><h2 className='KJH_testpage'>상품 목록 테스트</h2></Link>
      </div>
      <div>
        <Link to="/product/new"><h2 className='KJH_testpage'>등록 테스트</h2></Link>
      </div>
      <div>
        <Link to="/mypage"><h2 className='KJH_testpage'>마이페이지</h2></Link>
      </div>
      {/* <ImageSlide />
      <AdComponent /> */}
      <Products />
    </div>
  )
};

export default Main;