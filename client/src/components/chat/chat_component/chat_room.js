import React, { useState, useEffect } from 'react';
import './chat_room.css';
import io from 'socket.io-client';
import Room_info from './chat_room_componant/info/room_info';
import Room_main from './chat_room_componant/room_main/room_main';
import Preview from './chat_room_componant/preview/preview';
import Input from './chat_room_componant/input/input';


let socket;

function Chat_room({ selectedUser }){
  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  

  
  console.log("ChatRoom에서 selecteduser: ", selectedUser);
  socket = io();
  
  useEffect(() => {
    console.log("name: ", name);
    setName(name);
  })



  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message])
    })



    // 클라이언트에서 텍스트 메시지 전송
    socket.emit('sendMessage', { type: 'text', text: '텍스트 메시지' });

    // 클라이언트에서 이미지 메시지 전송
    socket.emit('sendMessage', { type: 'image', imageUrl: '이미지 URL' });



  }, [])

  

  const sendMessage = (event) => {
    event.preventDefault()
    console.log("전송 클릭");
    if (message) {
    console.log(message)
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }


  const uploadFile = (files, previews) => {
    if (files.length > 0 && files.length <= 15) {
      const fileMessages = files.map((file, index) => ({
        user: name,
        text: previews[index],
        type: 'file',
      }));
  
      socket.emit('sendFileMessages', {
        user: name,
        text: fileMessages,
        type: 'file'
      }, () => {
        setSelectedFiles(previews);
      });
    } else if (files.length > 15) {
      alert('파일은 최대 15개까지 선택 가능합니다.');
    }
  };
  
  const deleteImage = (index) => {
    const updatedPreviews = [...selectedFiles];
    updatedPreviews.splice(index, 1);
    setSelectedFiles(updatedPreviews);
    console.log("selectedFiles: ", selectedFiles);
  };

  return (
    <>
      {selectedUser ? 
      <div className='chat_room_Main'>
        <Room_info who={selectedUser}/>
        <Room_main messages={messages} name={name}/>
        {selectedFiles.length > 0 ? (
          <Preview 
           selectedFiles={selectedFiles}  
           deleteImage={deleteImage} />
          ):<></>}
        <Input 
          selectedFiles={selectedFiles} 
          setSelectedFiles={setSelectedFiles} 
          message={message} 
          setMessage={setMessage} 
          sendMessage={sendMessage} 
          uploadFile={uploadFile}
          />
      </div>
      :
      <>
        대화방을 선택해주세요
      </>
      }
    </>
  )
}

export default Chat_room;