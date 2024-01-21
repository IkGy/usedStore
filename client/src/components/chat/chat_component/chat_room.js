import React from 'react';
import './chat_room.css';
import { useState, useEffect } from 'react';

import Room_info from './chat_room_componant/info/room_info';
import Room_main from './chat_room_componant/room_main/room_main';
import Input from './chat_room_componant/input/input';




function Chat_room({ selectedUser }){
  console.log("ChatRoom에서 selecteduser: ", selectedUser);
  

  return (
    <div className='chat_room_Main'>
      {selectedUser ? 
      <>
        <Room_info who={selectedUser}/>
        <Room_main />
        <Input />
      </>
      :
      <>
        방 선택안함
      </>
      }
    </div>
  )
}

export default Chat_room;