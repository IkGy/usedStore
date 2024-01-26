// import { getCookie } from "../../useCookies";
// import React, { useEffect, useState } from "react";
// import { API_URL } from '../config/contansts';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// import soldout from "./image/soldout.png";

// function Mypagehoogi2() {

//   const [data, setData] = useState([])

//   useEffect(() => {
//     axios.get(`${API_URL}/review/mypagehoogi2`,{params:{id:getCookie('login')}})
//     .then((res) => {
//       console.log("DB 조회 완료");
//       console.log(res.data);
//       setData(res.data);
//     })
//     .catch((err) => {
//       console.error(err);
//       console.log("실패");
//     });
//   }, []);

//   const [end ,setEnd] = useState("");
//   const [isInitialLoad, setIsInitialLoad] = useState(true);

//   useEffect(() => {
//     if (!isInitialLoad) {
//       setTimeout(() => {
//         setEnd("end");
//       }, 400);

//       return () => {
//         setEnd("end2");
//       };
//     } else {
//       setIsInitialLoad(false);
//     }
//   }, [isInitialLoad]);

//   return(
//     <div className="JSW_picklist">
//       <div className="JSW_picklistname">구매 후기</div>
//       <div className="JSW_conentGridBox">
//         {data.map((data, i)=> {
//           return(
//             <div className="JSW_liststart"
//             key={data.id}>
//               <Link to={`/detail/${data._id}`}>
//               <div className="JSW_hoogiGridBox_img">
//                   <div className="JSW_Aname_hoogi">리뷰 작성자 : {data.writer}
//                 </div>
//                 </div>
//                 <div className="JSW_Aname_hoogi">후기 : {data.comment}</div>
//                 <div className="JSW_Aname_hoogi">작성일 : {data.update_at}</div>
//               </Link>
//             </div>
//           )
//         })}
//       </div>
//   </div>
//   )
// }

// export default Mypagehoogi2