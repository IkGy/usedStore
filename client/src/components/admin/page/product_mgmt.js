import { FaArrowUp } from "react-icons/fa";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/contansts";
import './admin_product.css';
import { Link } from "react-router-dom";

function ProductManagement() {
  const [prodData, setProdData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const deleteItem = async(id)=>{
    console.log(id);
    await axios.delete(`${API_URL}/admin/prodOne`,{params: {prod_id: id}})
    setModalIsOpen(false);
    getData();
  }

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

  const detailProd = async(id) => {
    const selectedProduct = prodData.find((product) => product._id === id);
    setSelectedProduct(selectedProduct);
    setModalIsOpen(true);
  };

  // 위로 스크롤
  const scrollToTop = () => {
    const element = document.querySelector('.menu_info');
    if (element) {
      element.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      <FaArrowUp onClick={scrollToTop} />
      <table className="admin_prod_table">
        <colgroup>
          <col style={{ width: "25%" }}  />
          <col style={{ width: "25%" }}  />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr className="admin_prod_table_tr">
            <th>제목</th>
            <th>제품설명</th>
            <th>판매자</th>
            <th>제품상태</th>
            <th>가격</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody className="admin_prod_table_tbody">
          {prodData && prodData.map((data, i) => (
            <tr key={i}>
              <td><Link to={`/detail/${data._id}`} target="_blank">{data.title}</Link></td>
              <td>{data.comment}</td>
              <td>{data.sellerInfo.nickname}</td>
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
                <h2>판매자</h2>
                <p>{selectedProduct.sellerInfo.nickname}</p>
                <p>{selectedProduct.sellerInfo.email}</p>
                <h2>구매자</h2>
                {selectedProduct.buyerInfo ?
                  <>
                    <p>{selectedProduct.buyerInfo.nickname}</p>
                    <p>{selectedProduct.buyerInfo.email}</p>
                  </>
                :
                  <p>아직 판매중인 상품입니다.</p>
                }
              </div>
            )}
            <button onClick={() => setModalIsOpen(false)}>닫기</button>
            <button onClick={() => deleteItem(selectedProduct._id)}>삭제</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;