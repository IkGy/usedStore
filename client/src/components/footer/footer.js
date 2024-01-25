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
          <h3> 리셀마켓(주) 개발자정보 </h3>
          <p className='footer_colorbl'>조장 : 조경익 | gmldi10009@gmail.com</p>
          <p style={{marginBottom: "0.7vw"}}> - 메인페이지랑 백엔드 보조 제작 </p>
          <p className='footer_colorbl'> 김정훈 | projdevhun@gmail.com </p>
          <p style={{marginBottom: "0.7vw"}}> - 상세페이지 구현 </p>
          <p className='footer_colorbl'> 박준호 | junho2088@naver.com </p>
          <p style={{marginBottom: "0.7vw"}}> - 로그인/회원가입/각종 로그인api 제작 </p>
          <p className='footer_colorbl'> 유민재 | dbalswo5312@naver.com </p>
          <p> - 기획 및 판매하기페이지, 이용약관, 푸터 제작 </p>
        </div>

        <div className="ymj_footer_right">
          
          <Link className="footer_giturl" to="https://github.com/IkGy/usedStore">깃 주소 : https://github.com/IkGy/usedStore</Link>
          <div>
            <p className='footer_colorbl'> 정선우 | jsw5sw@naver.com </p>
            <p style={{marginBottom: "0.7vw"}}> - 마이페이지 제작</p>
            <p className='footer_colorbl'> 차하민 | ssp04364@naver.com </p>
            <p style={{marginBottom: "0.7vw"}}> - 판매하기, 검색기능 구현및 제작 </p>
            <p className='footer_colorbl'> 허준영 | jyhhg@naver.com </p>
            <p> - 실시간채팅, 백엔드 제작 </p>
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default Footer;