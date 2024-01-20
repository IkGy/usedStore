import './room_list.css';
import { API_URL } from '../../config/contansts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../../../useCookies';



function Room_list(){
// 각 유저의 id를 가져오고
// 유저 id가 포함되어있는 채팅방 id를 조회해야함
// 유저가 포함된 채팅방의 정보를 왼쪽에 나열해주면 됨
// 컴포넌트화 시켜서 채팅방 리스트는 왼쪽
// 활성화된 채팅방은 오른쪽에 띄울 예정
// 
const [myRoom_list, setMyRoom_List] = useState([]);

useEffect(() => {
  axios.get(`${API_URL}/room_list`, {
    params:{id:getCookie('login')}})
  .then((res) => {
    console.log("조회성공");
    console.log(res.data);
  })
})

useEffect(() => {

},[myRoom_list])


  return(
    <div className='room_list_Main'>
      채팅방 리스트

    </div>
  );
}
export default Room_list;