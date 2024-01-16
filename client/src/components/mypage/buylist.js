import { useEffect, useState } from "react";

import img2 from "./image/g102.jpg"

function Buylist() {

  const [data, setData] = useState([
    {
      id: 1,
      img: img2,
      Aname: "로지텍 G102판매 사용감X",
      Kname: "."
    }
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
      구매 목록
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

export default Buylist