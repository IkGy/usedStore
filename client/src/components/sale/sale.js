import { Link, useSubmit } from "react-router-dom";
import Regi from "./regi";
import Product from "./product";
import Buylist from "./buylist";
import Selllist from "./selllist";
import React, { useEffect, useState } from "react";

function Sale() {
  const [status, setStatus] = useState("상품등록");

  return (
    <div>
      <div className="sale_select">
        <button
          onClick={() => setStatus("상품등록")}
          style={status === "상품등록" ? { color: "red" } : {}}
        >
          상품등록
        </button>
        <button
          onClick={() => setStatus("상품관리")}
          style={status === "상품관리" ? { color: "red" } : {}}
        >
          상품관리
        </button>
        <button
          onClick={() => setStatus("구매내역")}
          style={status === "구매내역" ? { color: "red" } : {}}
        >
          구매내역
        </button>
        <button
          onClick={() => setStatus("판매내역")}
          style={status === "판매내역" ? { color: "red" } : {}}
        >
          판매내역
        </button>
      </div>
      {status === "상품등록" && <Regi></Regi>}
      {status === "상품관리" && <Product></Product>}
      {status === "구매내역" && <Buylist></Buylist>}
      {status === "판매내역" && <Selllist></Selllist>}
    </div>
  );
}

export default Sale;
