import { useEffect } from 'react';
import './room_main.css';
import BasicScrollToBottom from 'react-scroll-to-bottom';

function Room_main({ messages, name }){
  useEffect(() => {
    console.log(messages);
  },[messages]);
  return(
    <BasicScrollToBottom className="messages">
      {
        messages.map((messages, i) => {
          return <div key={i}>
          채팅방
        </div>
        })
      }
      
      
    </BasicScrollToBottom>
  );
}
export default Room_main;