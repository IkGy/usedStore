import { Link } from "react-router-dom";
import "./footer.css";


function Footer(){
  return(
    <div className="footer_container">
      <div className="ymj_footer_link_all">
          <div className="ymj_footer_link">
            <Link to={'/'}>회사소개</Link>
          </div>
          <div className="ymj_footer_link">
            <Link to={'/rules'}>이용약관</Link>
          </div>
          <div className="ymj_footer_link">
            <Link to={'/pro'}>프로상점 약관</Link>
          </div>
          <div className="ymj_footer_link">
            <Link to={'/location'}>위치기반 약관</Link>
          </div>
      </div>

      <div className="ymj_footer_all"_>
        <div className="ymj_footer_left">
          <h3>리셀마켓(주) 개발자정보</h3>
          <p>조장 : 조경익 | </p>
          <p>메인페이지랑 백엔드 보조 제작</p>
          <h3>ㅡㅡ 조원 ㅡㅡ </h3>
          <p>김정훈 | backstar66@naver.com</p>
          <p>상세페이지 구현</p>
          <p>박준호 | junho2088@naver.com </p>
          <p>로그인/회원가입/각종 로그인api 제작</p>
          <p>유민재 | dbalswo5312@naver.com </p>
          <p>기획 및 판매하기페이지, 이용약관, 푸터 제작</p>
        </div>

        <div className="ymj_footer_right">
<<<<<<< HEAD
          
          <Link to="https://github.com/IkGy/usedStore">깃 주소 : https://github.com/IkGy/usedStore</Link>
          <div>
            <p>정선우 |</p>
            <p>마이페이지 제작</p>
            <p>차하민 | ssp04364@naver.com </p>
            <p>판매하기, 검색기능 구현및 제작</p>
            <p>허준영 | jyhhg@naver.com</p>
            <p>실시간채팅, 백엔드 제작</p>
          </div>
=======
          <h3>고객센터(1688-8282)</h3>
          <p>운영시간 9시 ~ 18시(주말/공휴일 휴무, 점심시간 12시 ~ 13시)</p>
          <p>리셀마켓(주)더현대안산점   |   곽구, 박사   |   335-55-08282</p>
          <p>안산특별시 홍대 기미로 88, 지하6층(여의도동, 아이즈원)</p>
>>>>>>> 8f268c6efe67738e18dfd0be19745082055b1282
        </div>

      
      </div>
    </div>
  )
}

export default Footer;