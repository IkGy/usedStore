import { Link } from "react-router-dom";
import Regi from "./regi";


function Sale() {
  return (
      
    <div>
      <div>
        <Link to={'/regi'}>상품등록</Link>
      </div>
      <div>
        <button>상품관리</button>
      </div>
      <div>
        <button>구매/판매 내역</button>
        <button>구매/판매 내역</button>
      </div>
    </div>
      
  );
}

export default Sale;