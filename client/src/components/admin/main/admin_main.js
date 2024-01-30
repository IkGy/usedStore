import { useState } from "react";
import Report from "../page/report";
import UserManagement from '../page/user_mgmt';
import ProductManagement from '../page/product_mgmt';
import "./admin_main.css";


function AdminMain() {
  const [menu, setMenu] = useState("유저관리");
  const MenuClick = (selectMenu) => {
    setMenu(selectMenu);
  };

  return (
    <div className="admin_contents">
      <div className="admin_tagBox">
        <nav>
          <ul className="admin_tags">
            <li>
              <div
                to="/page/user_mgmt"
                className={menu === "유저관리" ? "click" : "noneclick"}
                onClick={() => MenuClick("유저관리")}
              >
                유저관리
              </div>
            </li>
            <li>
              <div
                to="/page/product_mgmt"
                className={menu === "상품관리" ? "click" : "noneclick"}
                onClick={() => MenuClick("상품관리")}
              >
                상품관리
              </div>
            </li>
            <li>
              <div
                to="/page/report"
                className={menu === "신고" ? "click" : "noneclick"}
                onClick={() => MenuClick("신고")}
              >
                신고
              </div>
            </li>
          </ul>
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