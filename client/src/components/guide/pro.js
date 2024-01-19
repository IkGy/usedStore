import { Link } from "react-router-dom";

function Pro() {
  return (
      
    <div className="ymj_pro_all">
      <div className="ymj_guide_link">
        <div className="ymj_guide_link1">
          <Link to={'/rules'}>번개장터</Link>
        </div>
        <div className="ymj_guide_link2">       
          <Link to={'/pro'}>프로상점</Link>
        </div>
        <div className="ymj_guide_link3">
          <Link to={'/'}>위치기반</Link>
        </div>
      </div>

      <div>
        <li>gㅇㅎㅇㅎㅇㅎㅇㅎㅇ</li>
      </div>


    </div>
  );
}

export default Pro;