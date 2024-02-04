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
  
  // 검색 필터기능
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProdData = prodData.filter(product => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.sellerInfo.nickname.toLowerCase().includes(searchTerm.toLowerCase());
  });


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
    const element = document.querySelector('.menu_section');
    if (element) {
      element.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="admin_prod_container">
      <FaArrowUp onClick={scrollToTop} />
      <div className='admin_prod_search_section'>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleSearchChange} 
          placeholder="검색..." />
      </div>
      <table className="admin_prod_table">
        <colgroup>
          <col style={{ width: "25%" }}  />
          <col style={{ width: "35%" }}  />
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
            <th>가격</th>
            <th>제품상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody className="admin_prod_table_tbody">
          {filteredProdData && filteredProdData.map((data, i) => (
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
                <div className="modal_seller_section">
                  <div className="modal_seller">판매자</div>
                  <div className="modal_seller_info">
                    <div>{selectedProduct.sellerInfo.nickname}</div>
                    <div>( {selectedProduct.sellerInfo.email} )</div>
                  </div>
                </div>
                <div className="modal_prod_title">{selectedProduct.title}</div>
                <div className="modal_prod_comment">{selectedProduct.comment}</div>

                <div className="modal_buyer_section">
                  {selectedProduct.status == "판매완료" ?              
                      <div className="modal_buyer_info">판매 완료 상품입니다.</div>
                  :
                    <div className="modal_buyer_info">아직 판매중인 상품입니다.</div>
                  }
                </div>
              </div>
            )}
            <div className="modal_open_delete_section">
              <div onClick={() => setModalIsOpen(false)} className="modal_prod_close">닫기</div>
              <div onClick={() => deleteItem(selectedProduct._id)} className="modal_prod_del">삭제</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;