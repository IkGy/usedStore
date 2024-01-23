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
            <Link to={'/'}>운영정책</Link>
          </div>
          <div className="ymj_footer_link">
            <Link to={'/'}>개인정보처리방침</Link>
          </div>
          <div className="ymj_footer_link">
            <Link to={'/'}>청소년보호정책</Link>
          </div>
          <div className="ymj_footer_link">
            <Link to={'/'}>광고제휴</Link>
          </div>
      </div>

      <div className="ymj_footer_all"_>
        <div className="ymj_footer_left">
          <h3>리셀마켓(주) 사업자정보</h3>
          <p>대표이사 : 조조 | 개인정보보호책임자 : 푸바오</p>
          <p>사업자등록번호 : 112-88-44444 | 통신판매업신고 : 2019-평택시-1129</p>
          <p>호스팅서비스 제공지 : Amazon web Services(AWS)</p>
          <p>EMAIL:macat@naver.com | FAX : 02-588-8282</p>
          <p>주소 : 평택특별시 분당구 얌얌대로 18길 11, 청운빌딩 5층</p>
        </div>

        <div className="ymj_footer_right">
          <h3>고객센터</h3>
          <h2>1688-8282</h2>
          <p>운영시간 9시 ~ 18시(주말/공휴일 휴무, 점심시간 12시 ~ 13시)</p>
          <p>리셀마켓(주)더현대안산점   |   곽구, 박사   |   335-55-08282</p>
          <p>안산특별시 홍대 기미로 88, 지하6층(여의도동, 아이즈원)</p>
        </div>

      
      </div>
    </div>
  )
}

export default Footer;