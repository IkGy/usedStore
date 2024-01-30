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
      .get(`${API_URL}/product/registered`, {
        params: { id: getCookie("login") },
      })
      .then((res) => {
        setData(res.data);
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

  let sell = (_id) => {
    // 확인 대화상자를 표시하고 사용자의 응답을 확인합니다.
    const userConfirmed = window.confirm("판매완료 상태로 만드시겠습니까?");
  
    // 사용자가 "확인"을 클릭했을 때만 axios 요청을 보냅니다.
    if (userConfirmed) {
      axios.post(`${API_URL}/sellcomplete/${_id}`).then((result) => {
        axios
          .get(`${API_URL}/product/registered`, {
            params: { id: getCookie("login") },
          })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.error(err);
            console.log("실패");
          });
      });
    }
  };

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
            {data.map((data, i) => {
              return (
                <div className="JSW_liststart" key={data.id}>
                  <Link to={`/detail/${data._id}`}>
                    <div className="JSW_contentGridBox_img">
                      <img
                        src={data.images[0]}
                        style={
                          data.status === "판매중"
                            ? { opacity: "1" }
                            : { opacity: "0.5" }
                        }
                        width="100%"
                      ></img>
                    </div>
                    <div className="JSW_AnameBox">
                      <div className="JSW_Aname">{data.title}</div>
                      <div className="JSW_Aname">{data.price}원</div>
                    </div>
                  </Link>

                  {data.status === "판매중" ? (
                    <div className="JSW_list_edit_delete">
                      <div onClick={() => sell(data._id)} className="JSW_sell">
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
                  ) : (
                    <div className="JSW_list_edit_delete" style={{gridTemplateColumns: "1fr"}}>
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
                  )}
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
