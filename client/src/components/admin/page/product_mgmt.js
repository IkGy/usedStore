import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/contansts";
import './admin_product.css';

function ProductManagement() {
  const [prodData, setProdData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getData = async () => {
    await axios.get(`${API_URL}/admin/prodAll`)
      .then((response) => {
        console.log(response.data);
        setProdData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const detailProd = (id) => {
    const selectedProduct = prodData.find((product) => product._id === id);
    console.log("Selected Product:", selectedProduct);
    setSelectedProduct(selectedProduct);
    setModalIsOpen(true);
  };

  return (
    <div>
      <table className="admin_prod_list">
        <thead>
          <tr>
            <th>제목</th>
            <th>제품설명</th>
            <th>판매자</th>
            <th>구매자</th>
            <th>제품상태</th>
            <th>가격</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {prodData.map((data, i) => (
            <tr className="admin_prodData" key={i}>
              <td>{data.title}</td>
              <td>{data.comment}</td>
              <td>{data.sellerInfo.nickname}</td>
              {data.buyerInfo ? 
                <td>{data.buyerInfo.nickname}</td>
                :
                <td></td>
              }
              <td>{data.price}</td>
              <td>{data.status}</td>
              <td>
                <button onClick={() => detailProd(data._id)}>
                  상세보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalIsOpen && (
        <div className="modalOverlay">
          <div className="datailModal">
            {selectedProduct && (
              <div>
                <h2>{selectedProduct.title}</h2>
                <p>{selectedProduct.comment}</p>
                {/* 다른 상세 정보 표시 */}
              </div>
            )}
            <button onClick={() => setModalIsOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;