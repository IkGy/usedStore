import "./mypageedit.css";
import React, { useEffect, useState, useRef  } from "react";

function Myapgeedit() {
  const [modalOpen, setModalOpen] = useState(false);
  // 모달 끄기 
  const closeModal = () => {
      setModalOpen(false);
  };



  return(
    <div className="JSW_myeditcontainer">
      <button className="JSW_myeditclose" onClick={closeModal}>
        X
    </button>
    <p>모달창입니다.</p>
    </div>
  )
}

export default Myapgeedit;



// 출처: https://curryyou.tistory.com/493 [카레유:티스토리]
// 모달 페이지 출처 