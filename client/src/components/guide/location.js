import { Link } from "react-router-dom";
import "./location.css";

function Location() {
  return (

    <div className="ymj_location_all">
      <div className="ymj_location_link">
        <div className="ymj_location_link1">
          <Link to={'/rules'}>리셀마켓</Link>
        </div>
        <div className="ymj_location_link2">       
          <Link to={'/pro'}>프로상점</Link>
        </div>
        <div className="ymj_location_link3">
          <Link to={'/location'}>위치기반</Link>
        </div>
      </div>

      <div className="ymj_location_entire">
        <h2>리셀마켓 위치기반서비스 이용약관</h2>
        <div className="ymj_location_Chapter">
          <h3>안내문</h3>
          <span>번개장터는 회원님의 권익을 보호하고 회원님들의 위치정보 보호에 만전을 기하고자 관계법령의 규정을 반영하<br/>
          여 위치기반서비스 이용약관을 적용하고 있습니다.</span>
        </div>

        <div className="ymj_location_Chapter">
          <h3>제 1 장 총칙</h3>
          <div>
            <div className="ymj_location_number">
              <li>제 1 조 (목적)</li>
              <div className="ymj_location_li">
                <li>본 약관은 회원(번개장터 서비스 약관에 동의한 개인위치정보주체를 말합니다. 이하 “회원”이라고 합<br/>
                  니다.)이 번개장터 주식회사(이하 “회사”라고 합니다.)가 제공하는 번개장터 서비스(이하 “서비스”라고<br/>
                  합니다)를 이용함에 있어 회사와 회원의 권리·의무 및 기타 필요한 사항을 규정함을 목적으로 합니다.</li>
              </div>
            </div>
        
            <div className="ymj_location_number">
              <li>제 2 조 (용어의 정의)</li>
              <div className="ymj_location_li">
                <li>“서비스”란 회사가 서비스 홈페이지 또는 어플리케이션을 통해 이용자에게 제공하는 위치정보수집대<br/>
                상의 위치 추적 및 상태 정보 서비스를 말합니다.</li>
                <li>“고객”이란 회사와의 계약 하에 회사게 제공하는 서비스를 받고 요금을 지불하는 기업 또는 개인을<br/>
                말합니다.</li>
                <li>“위치정보수집대상”이라 함은 고객이 서비스 이용을 목적으로 위치추적을 하고자하는 대상물을 말합<br/>
                니다.</li>
                <li>“위치정보확인자”는 위치정보수집대상의 위치정보 조회 및 상태정보 관제에 대한 관리 업무를 위해 <br/>
                회원으로부터 위탁받거나 고용되어 회사의 서비스 홈페이지를 통해 서비스를 이용하는 사람을 말합<br/>
                니다.</li>
                <li>“개인위치정보주체”란 위치정보수집대상을 업무상 고정적으로 운영하는 자로서 개인위치정보에 의<br/>
                하여 식별되는 자를 말합니다.</li>
                <li>“이용자”란 위치정보확인자 또는 개인위치정보주체 등 홈페이지 또는 어플리케이션을 통해 서비스를<br/>
                이용하는 자를 말합니다.</li>
                <li>“운영자”란 서비스의 전반적인 관리와 원활한 운영을 위하여 회사가 선정한 자를 말합니다.</li>
                <li>“단말”이라 함은 회사가 제공하는 서비스를 이용하기 위해 고객이 구매하여 위치정보수집대상에 부<br/>
                착 또는 설치하는 통신장치 등을 말합니다.</li>
              </div>
            </div>

            <div className="ymj_location_number">
              <li>제 3 조 (이용약관의 효력 및 변경)</li>
              <div className="ymj_location_li">
                <li>본 약관은 서비스를 신청한 고객 또는 개인위치정보주체가 본 약관에 동의하고 회사가 정한 소정의 <br/>
                  절차에 따라 서비스의 이용자로 등록함으로써 효력이 발생합니다.</li>
                <li>회원이 온라인에서 본 약관의 “동의하기” 버튼을 클릭하였을 경우 본 약관의 내용을 모두 읽고 이를<br/>
                  충분히 이해하였으며, 그 적용에 동의한 것으로 봅니다.</li>
                <li>회사는 위치기반서비스의 변경사항을 반영하기 위하여 필요한 경우 등에는 위치정보의 보호 및 이용<br/>
                  등에 관한 법률, 콘텐츠산업 진흥법, 전자상거래 등에서의 소비자보호에 관한 법률, 소비자기본법, 약<br/>
                  관의 규제에 관한 법률 등 관련법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</li>
                <li>회사가 약관을 개정할 경우에는 적용일자, 개정사유, 현행약관 및 개정약관의 내용과 개정약관 적용<br/>
                  일까지 동의 또는 거부의 의사표시를 하지 아니하면 개정약관에 동의한 것으로 본다는 내용을 각 명<br/>
                  시하여 다음과 같은 방법으로 게시 및 통지합니다.</li>
                <div className="ymj_location_li2">
                  <li>서비스 홈페이지 등 게시 : 개정약관 적용일 30일 전부터 적용일 이후 상당한 기간(10일 기간)</li>
                  <li>회원에게 전자적 형태(전자우편, SMS 등)로 개별 통지 : 개정약관 적용일로부터 30일 전</li>
                </div>
                <li>회사의 전항에 따른 게시 및 통지 후에도 회원이 개정약관 적용일까지 개정약관에 대해 동의 또는 거<br/>
                  부의 의사표시를 하지 않을 때에는 회원이 해당 개정약관에 동의한 것으로 봅니다.</li>
              </div>
            </div>

            <div className="ymj_location_number">
              <li>제 4 조 (관계법령의 적용)</li>
              <div className="ymj_location_li">
                <li>본 약관은 신의성실의 원칙에 따라 공정하게 적용하며, 본 약관에 명시되지 아니한 사항에 대하여는 <br/>
                  관계법령 또는 상관례에 따릅니다.</li>
              </div>
            </div>
          </div>




        </div>

       
        <div className="ymj_location_end">
          <p>이전의 위치기반서비스 이용약관은 아래에서 확인하실 수 있습니다. </p>
        </div>

      </div>

    </div>
    );
  }
  
  export default Location;