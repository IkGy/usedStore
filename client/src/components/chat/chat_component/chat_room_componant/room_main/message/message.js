import React, { useState } from "react";
import './message.css';
import ReactEmoji from 'react-emoji';

function Message({ message: { user, text, type }, name }) {
// 상대유저가 보낸 메시지가 맞는지 확인
let isSentByCurrentUser = false;



const trimmedName = name.trim().toLowerCase();
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }


// 만들어야할 기능
// 1. 보낸 메시지가 텍스트인지 이미지형식인지 확인
// 2. 이미지형식이라면 미리보기가 가능하도록 지원
// 3. Preview 컴포넌트에 정보를 전달

// 보낸 메시지의 타입은?
const confirmMessageType = () => {
  if (message.type === 'text') setIsTextType(true);
  else setIsTextType(false)
}

  return  isSentByCurrentUser ? (
    // 내가 보낸 메시지면 오른쪽에 다른사람이 보낸 메시지면 왼쪽에 출력 
    isTextType ? (
    // 텍스트 타입일 경우 p태그로 표시
    <div className='messageContainer justifyEnd'>
      <p className='sentText pr-10'>{trimmedName}</p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
    ):(
      // 이미지 타입일 경우 img태그로 표시
      <div className='messageContainer justifyEnd'>
        <p className='sentText pr-10'>{trimmedName}</p>
        <div className='messageBox backgroundBlue'>
          <img className="messageImg"></img>
        </div>
      </div>
      )
    ) : (
      isTextType ? (
      // 텍스트 타입일 경우 p태그로 표시
      <div className='messageContainer justifyStart'>
          <div className='messageBox backgroundLight'>
          <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
        </div>
        <p className='sentText pl-10 '>{user}</p>
      </div>
    ) : (
      // 이미지 타입일 경우 img태그로 표시
      <div className='messageContainer justifyStart'>
        <div className='messageBox backgroundLight'>
        <img className='messageImg'></img>
        </div>
        <p className='sentText pl-10 '>{user}</p>
      </div>
    )
  )
}
export default Message;