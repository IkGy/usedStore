import { getCookie } from "../../useCookies";
import { API_URL } from "../config/contansts";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import no from "./image/6179016.png";

function Registered(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/prod/product/registered`, {
        params: { id: getCookie("login") },
      })
      .then((res) => {
        setData(res.data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        console.log("실패");
      });
  }, []);

  const handleDelete = (productId) => {
    console.log(productId);
    axios
      .delete(`${API_URL}/prod/delete/${getCookie("login")}/${productId}`)
      .then((res) => {
        console.log("상품 삭제 완료");
        // alert('상품이 삭제되었습니다');
        navigate("/mypage");
      })
      .catch((err) => {
        console.error(err);
        console.log("상품 삭제 실패");
      });
  };

  const Regi = props.data;

  const [end, setEnd] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isInitialLoad) {
      setTimeout(() => {
        setEnd("end");
      }, 400);

      return () => {
        setEnd("end2");
      };
    } else {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  return (
    <div className="JSW_picklist">
      <div className="JSW_picklistname">
        등록된 상품 <span>({data.length})</span>
      </div>
      <div className="JSW_conentheightBox">
        {data.length === 0 ? (
          <div className="JSW_noproductbox">
            <img src={no}></img>
            <div>등록된 상품이 없습니다.</div>
            <Link to="/sellitem">상품등록 하기!</Link>
          </div>
        ) : (
          <div className="JSW_conentGridBox">
            {data && data.map((data, i) => {
              return (
                <div className="JSW_liststart" key={data.id}>
                  <Link to={`/detail/${data._id}`}>
                    <div className="JSW_contentGridBox_img">
                      <img src={data.images[0]} width="100%"></img>
                    </div>
                    <div className="JSW_AnameBox">
                      <div className="JSW_Aname">{data.title}</div>
                      <div className="JSW_Aname">{data.price}원</div>
                    </div>
                  </Link>
                  <div className="JSW_list_edit_delete">
                    <div className="JSW_sell">
                      <div>완료</div>
                    </div>
                    <div className="JSW_listedit">
                      <Link to={`/sellitemedit/${data._id}`}>수정</Link>
                    </div>
                    <div
                      className="JSW_listdelete"
                      onClick={() => {
                        window.location.reload();
                        handleDelete(data._id);
                        alert("상품이 삭제되었습니다.");
                      }}
                    >
                      삭제
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Registered;