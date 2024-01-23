import "./room_list.css";
import { API_URL } from "../../config/contansts";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../../useCookies";

function Room_list({ onSelectUser }) {
  // 각 유저의 id를 가져오고
  // 유저 id가 포함되어있는 채팅방 id를 조회해야함
  // 유저가 포함된 채팅방의 정보를 왼쪽에 나열해주면 됨
  // 컴포넌트화 시켜서 채팅방 리스트는 왼쪽
  // 활성화된 채팅방은 오른쪽에 띄울 예정
  //
  const [myRoom_list, setMyRoom_List] = useState([]);
  const [user, setUser] = useState([]);
  

  useEffect(() => {
    try {
      axios
        .get(`${API_URL}/room_list`, {
          params: { id: getCookie("login") },
        })
        .then((res) => {
          console.log("조회성공");
          setMyRoom_List(res.data);
          let updatedUsers = [];
          for (let i = 0; i < res.data.length; i++) {
            let filteruser = res.data[i].user.filter(
              (element) => element !== getCookie("login")
            );
            updatedUsers.push(...filteruser);
          }
          setUser(updatedUsers);
        });
    } catch (error) {
      console.error("데이터를 불러오는 중 에러가 발생했습니다:", error);
    }
  }, []);

  const clickRoom = (user) => {
    // console.log("clickRoom실행됨");
    console.log(`${user}님과의 채팅방`);
    onSelectUser(user);
  }

  return (
    <div className="room_list_Main">
      {
      myRoom_list.map((a, i) => {
        return <div 
          key={i}
          className="room_list"
          onClick={() => clickRoom(user[i])}
          >{user[i]}님과의 채팅방</div>;
      })}

    </div>
  );
}

export default Room_list;
