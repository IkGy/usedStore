import React from "react";
import { useEffect, useState } from "react";
import Chat_room from "./chat_component/chat_room";
import Room_list from "./chat_component/room_list";

import './chat.css'


function Chat(){
  const [selectedUser, setSelectedUser] = useState(null);
  // console.log("Chat에서 selecteduser: ", selectedUser);

  const SelectUser = (user) => {
    setSelectedUser(user);
  };

  return(
    <div className="chat_page_Main">
      <div className="room_list_div">
        <Room_list
          selectedUser={selectedUser}
          onSelectUser={SelectUser}
        />
      </div>
      <div className="chat_room_div">
        <Chat_room  selectedUser={selectedUser}/>
      </div>
    </div>
  );
}

export default Chat;