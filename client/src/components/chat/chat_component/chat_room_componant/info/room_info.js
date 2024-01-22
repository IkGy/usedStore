import React, { useEffect } from 'react';
import './room_info.css';
import select_user from '../../room_list';






function Room_info({ who }){
  
  // console.log("who: ", who);


  return(
    <div className='chat_room_info_main'>
      <div className='InnerContainer'>
        {/* ~~님과의 채팅방 쓸지말지 고민중 (나중문제긴 함) */}
        {/* 아니면 거래를 위해 채팅을 한 상품을 보여주는거? */}
        <h3>{who}님과의 채팅</h3>
      </div>
    </div> 
  );
}





export default Room_info;