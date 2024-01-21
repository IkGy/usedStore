import React, { useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import './input.css';





function Input(){
  return(
    <form className='chat_room_input_main'>
      <label htmlFor="file-upload" className="custom-file-upload">
        <FaRegPlusSquare />
      </label>

      <input
        id="file-upload"
        type="file"
        multiple
      />

      <input
        className="input_area"
        type="text"
        placeholder="전송하려는 메시지를 입력하세요."
      />

      <button className="sendButton" >전송</button>
    </form> 
  );
}





export default Input;