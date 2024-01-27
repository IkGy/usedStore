import { getCookie } from "../../useCookies";
import React, { useEffect, useState } from "react";
import { API_URL } from '../config/contansts';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./picklist.css"

import img3 from "./image/noimg.png"

function Picklist() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/like/picklist`,{params:{id:getCookie('login')}})
    .then((res) => {
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
      <div className="JSW_picklistname">찜 목록</div>
      <div className="JSW_conentGridBox">
        {data.map((data, i)=> {
          let img0 = null;
          if (data.images.length > 0)
          {
            img0 = data.images[0];
          }else {
            img0 = img3;
          }
          return(
            <div className="JSW_liststart"
              key={data.id}>
            <Link to={`/detail/${data._id}`}>
              <div className="JSW_contentGridBox_img">
                <img src={img0} width="100%"></img>
              </div>
              <div className="JSW_Aname">{data.title}</div>
              <div className="JSW_Aname">{data.comment}</div>
              <div className="JSW_Aname">{data.liker}</div>
            </Link>
              <div className="JSW_list_edit_delete">
                <div className="JSW_listedit"></div>
                <div className="JSW_listdelete"></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Picklist

