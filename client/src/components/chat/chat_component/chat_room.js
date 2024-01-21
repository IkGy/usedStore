import React from 'react';
import './chat_room.css';
import { useState, useEffect } from 'react';

import Room_info from './chat_room_componant/info/room_info';
import Input from './chat_room_componant/input/input';
import Room_main from './chat_room_componant/room_main/room_main';




function Chat_room(){
let selectRoom = true;
const [select, setSelect]= useState();

  return (
    <div className='chat_room_Main'>
      {selectRoom ? 
      <>
        <Room_info />
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