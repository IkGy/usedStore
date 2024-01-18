import { getCookie } from "../../useCookies";
import React, { useEffect, useState } from "react";
import { API_URL } from '../config/contansts';
import axios from 'axios';
function Soldlist() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/product/soldlist`,{params:{id:getCookie('login')}})
    .then((res) => {
      console.log("DB 조회 완료");
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.error(err);
      console.log("실패");
    });
  }, []);

  const [end ,setEnd] = useState("");
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

  return(
    <div className="JSW_picklist">
      <div className="JSW_picklistname">판매 내역</div>
      <div className="JSW_conentGridBox">
        {data.map((data, i)=> {
          return(
            <div className="JSW_liststart"
            key={data.id}>
              <div className="JSW_contentGridBox_img">
                <img src={data.images} width="100%"></img>
              </div>
              <div className="JSW_Aname">{data.title}</div>
              <div className="JSW_Aname">{data.comment}</div>
              <div className="JSW_Aname">{data.price}</div>
            </div>
          )
        })}
      </div>
   </div>
  )
}

export default Soldlist