import React, { useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import './input.css';





function Input({ selectedFiles, setSelectedFiles, message, setMessage, sendMessage, uploadFile }){
  
  const imageUpload = (e) => {
    e.preventDefault();

    const selectedFiles = e.target.files;
    if (selectedFiles.length > 10) {
      alert("이미지는 최대 10개까지만 등록 가능합니다.");
    } else {
      const filesArray = Array.from(selectedFiles);
      console.log("filesArray: ", filesArray);
      const updatedFiles = [...selectedFiles, ...filesArray];
      console.log("updatedFiles: ", updatedFiles);
      setSelectedFiles(filesArray);
      console.log("selectedFiles: ", selectedFiles);
    }
  };
  
  
    // 파일 선택 시 사용
  const selectFile = (e) => {
    console.log("파일 선택함");
  }
  const selectInputBar = (e) => {
    console.log("인풋바 선택함");
  }



  return(
    <form className='chat_room_input_main'>
      <label htmlFor="file-upload" className="custom-file-upload" onClick={selectFile}>
        <FaRegPlusSquare />
      </label>

      <input
        id="file-upload"
        type="file"
        onChange={imageUpload}
        multiple
      />

      <input
        className="input_area"
        type="text"
        placeholder="전송하려는 메시지를 입력하세요."
        onClick={selectInputBar}
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />

      <button 
        className="sendButton" 
        onClick={e => sendMessage(e)} >전송</button>
    </form> 
  );
}





export default Input;