import { getCookie } from "../../useCookies";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config/contansts";
import axios from "axios";
import { Link } from "react-router-dom";
import noheart from "./image/noh.png";

import img3 from "./image/noimg.png";

function Picklist() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/like/picklist`, { params: { id: getCookie("login") } })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log("실패");
      });
  }, []);

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

  let likedel = (product_id) => {
    axios
      .delete(`${API_URL}/like/likedel/${getCookie("login")}/${product_id}`)
      .then((result) => {
        console.log(result.data);
        // 삭제 후 데이터 다시 불러오기
        axios
          .get(`${API_URL}/like/picklist`, { params: { id: getCookie("login") } })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.error(err);
            console.log("실패");
          });
      });
  };

  return (
    <div className="JSW_picklist">
      <div className="JSW_picklistname">
        찜 목록 <span>({data.length})</span>
      </div>
      <div className="JSW_conentheightBox">
        {data.length === 0 ? (
          <div className="JSW_noheartbox">
            <img src={noheart}></img>
            <div>아직 찜한 상품이 없습니다.</div>
          </div>
        ) : (
          <div className="JSW_conentGridBox">
            {data.map((data, i) => {
              let img0 = null;
              if (data.images.length > 0) {
                img0 = data.images[0];
              } else {
                img0 = img3;
              }
              return (
                <div className="JSW_liststart" key={data.id}>
                  <Link to={`/detail/${data._id}`}>
                    <div className="JSW_contentGridBox_img">
                      <img src={img0} width="100%"></img>
                    </div>
                    <div className="JSW_AnameBox">
                      <div className="JSW_Aname">{data.title}</div>
                      <div className="JSW_Aname">{data.price}원</div>
                    </div>
                  </Link>
                  <div className="JSW_list_edit_delete2">
                    <div
                      className="JSW_sell"
                      style={{ borderRight: "1px solid black" }}
                    >
                      <div>채팅</div>
                    </div>
                    <div
                      className="JSW_listdelete"
                      onClick={() => likedel(data._id)}
                    >
                      찜 해제
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

export default Picklist;
