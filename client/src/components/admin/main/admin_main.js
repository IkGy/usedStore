import { useEffect, useState } from "react";
import Report from "../page/report";
import UserManagement from '../page/user_mgmt';
import ProductManagement from '../page/product_mgmt';
import "./admin_main.css";
import Logo from './logo.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../../../useCookies";

function AdminMain() {
  const [menu, setMenu] = useState("유저관리");
  const navigate = useNavigate();
  const MenuClick = (selectMenu) => {
    setMenu(selectMenu);
  };

  useEffect(()=>{
    if (!getCookie('admin')) {
      const pw = prompt('관리자 비밀번호를 입력해주세요 ');
      if (pw == 'resellmarketadmin') {
        
        setCookie('admin','%2265a630e6c03024116f7f%',{ expires: new Date(Date.now() + 60 * 60 * 1000) })
      }else{
        navigate('/');
      }
    }
  },[])

  return (
    <div className="admin_contents">
      <div>
        <nav>
          <div className="admin_page_title_display">
            <div className="admin_page_title_section">
              <Link to='/'><img src={Logo} alt="logo"/></Link>
            </div>
            <div className="admin_page_title_name">Administrator Page</div>
          </div>
          
          <div className="admin_tagbox_container">
            <div
              to="/page/user_mgmt"
              className={menu === "유저관리" ? "click" : "noneclick"}
              onClick={() => MenuClick("유저관리")}
            >
              유저관리
            </div>
            <div
              to="/page/product_mgmt"
              className={menu === "상품관리" ? "click" : "noneclick"}
              onClick={() => MenuClick("상품관리")}
            >
              상품관리
            </div>
            <div
              to="/page/report"
              className={menu === "신고" ? "click" : "noneclick"}
              onClick={() => MenuClick("신고")}
            >
              신고
            </div>
          </div>
        </nav>
      </div>
      <div className="menu_info">
        {menu === "유저관리" && <div>{<UserManagement></UserManagement>}</div>}
        
        {menu === "상품관리" && <div>{<ProductManagement></ProductManagement>}</div>}
        
        {menu === "신고" && <div>{<Report></Report>}</div>}
      </div>
    </div>
  );
}

export default AdminMain;