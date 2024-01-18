import { useEffect, useState } from "react";
import { API_URL } from '../config/contansts';
import "./picklist.css"

import img1 from "./image/img_mouse.jpg"
import img2 from "./image/g102.jpg"

function Picklist() {
  const [data, setData] = useState ([
    {
      id: 1,
      Aname : "레이저 게이밍 마우스",
      Kname : ".",
      img: img1,
    },
    {
      id: 1,
      Aname : "레이저 게이밍 마우스2",
      Kname : ".",
      img: img2,
    },
    {
      id: 1,
      Aname : "레이저 게이밍 마우스3",
      Kname : ".",
      img: img2,
    },
    {
      id: 1,
      Aname : "레이저 게이밍 마우스4",
      Kname : ".",
      img: img2,
    },
    {
      id: 1,
      Aname : "레이저 게이밍 마우스4",
      Kname : ".",
      img: img2,
    },
  ])

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
        {data.map((a, i)=> {
          return(
            <div className="JSW_liststart"
              key={a.id}>
              <div className="JSW_contentGridBox_img">
                <img src={a.img} width="100%"></img>
              </div>
              <div className="JSW_Kname">{a.Kname}</div>
              <div className="JSW_Aname">{a.Aname}</div>
              <div className="JSW_Kname">{a.Kname}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Picklist