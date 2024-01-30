import "./room_list.css";
import { API_URL } from "../../config/contansts";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../../useCookies";
import { Link, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { io } from "socket.io-client";

let socket;
const ENDPOINT = 'http://localhost:5000'

function Room_list({ onSelectUser, onSelectRoom }) {
  // 각 유저의 id를 가져오고
  // 유저 id가 포함되어있는 채팅방 id를 조회해야함
  // 유저가 포함된 채팅방의 정보를 왼쪽에 나열해주면 됨
  // 컴포넌트화 시켜서 채팅방 리스트는 왼쪽
  // 활성화된 채팅방은 오른쪽에 띄울 예정
  //
  const [myRoom_list, setMyRoom_List] = useState([]);
  const [user, setUser] = useState([]);
  const [room, setRoom] = useState('');


  useEffect(() => {
    axios.get(`${API_URL}/room_list`, {
        params: { id: getCookie("login") },
      })
      .then(async (res) => {
        console.log("조회성공");
        setMyRoom_List(res.data);
  
        const updatedUsers = [];
        for (let i = 0; i < res.data.length; i++) {
          const filteruser = res.data[i].user.filter(
            (element) => element !== getCookie("login")
          );
          updatedUsers.push(...filteruser);
        }
        setUser(updatedUsers);
        const nicknames = await getNicknames(updatedUsers);
        setUser(nicknames);
  
        console.log("updatedUsers: ", updatedUsers);
        console.log("user: ", nicknames);
      })
      .catch((error) => {
        console.error("Failed to fetch room list", error);
      });
  }, []);
  

  const getNicknames = async (userIds) => {
    try {
      const response = await axios.get(`${API_URL}/user_nicknames`, {
        params: { userIds: userIds },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user nicknames", error);
      return [];
    }
  };
  

  const clickRoom = async (user, id) => {
    console.log("user.id: ", id);  
    socket = io(ENDPOINT)

    await axios.get(`${API_URL}/chat_log`, {params:{ room_id: id }})
    .then((res)=>{
      // console.log("res: ", res);
      // console.log("res.data: ", res.data);
      if(res.data.length < 1){
        console.log("로그가 없음!"); 
      } else {
        console.log("room_id: ", res.data[0].room_id);
      }
      // console.log("방id:", id); 
      // console.log("res: ", res.data[0].chat);
    })
    .catch((error)=> {
      console.log("error: ", error);
    })

    // console.log("clickRoom실행됨");
    // console.log(user);
    // console.log(`${user}님과의 채팅방`);
    onSelectUser(user);
    onSelectRoom(id);

  }
  
  return (
    
    <><div className="room_list_Main">
    <div className="room_list_Top">
      <h1 className="room_list_name">나의 채팅방</h1>
    </div>
    {myRoom_list.map((a, i) => {
      return <div
        key={a._id}
        onClick={() => {
          clickRoom(user[i], a._id);
        }}
        className="room_list"
        >{user[i]}님과의 채팅방</div>
      })}
    </div>
    </>
  );
}

export default Room_list;
