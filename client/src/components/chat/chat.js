import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../../useCookies";
import { API_URL } from "../config/contansts";
import Room_list from "./chat_components/room_list.js";
import Chat_room from "./chat_components/chat_room.js";
import './chat.css'


function Chat(){
  console.log("chat진입");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
 


  const SelectUser = (user) => {
    setSelectedUser(user);
  };
  const SelectRoom = (room) => {
    setSelectedRoom(room);
  };

  return(

    <div className="chat_page_Main">
      <Room_list 
        selectedUser={selectedUser} 
        onSelectUser={SelectUser} 
        selectedRoom={selectedRoom} 
        onSelectRoom={SelectRoom} 
        />
      <Chat_room 
        selectedUser={selectedUser} setSelectedUser={setSelectedUser}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
    </div>
  );
}

export default Chat;