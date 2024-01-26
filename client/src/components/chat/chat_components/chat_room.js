import React, { useState, useEffect } from 'react';
import './chat_room.css';
import io from 'socket.io-client';
import BasicScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';
import { API_URL } from '../../config/contansts';
import { getCookie } from '../../../useCookies';
import { FaRegPlusSquare, FaTimes } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ReactEmoji from 'react-emoji';

let socket;
const ENDPOINT = 'http://localhost:5000'

function Chat_room({ selectedUser, selectedRoom }){
  console.log("Chat_room 진입");
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);


  // 지울거임
  const images = null;
  const selectFile = (e) => {
    console.log("파일 선택함");
  }
  const selectInputBar = (e) => {
    console.log("인풋바 선택함");
  }
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
// -----------------------------------------------------//



useEffect(() => {
  console.log("ChatRoom에서 selecteduser: ", selectedUser);
  console.log("ChatRoom에서 selectedroom: ", selectedRoom);
  setUser(getCookie('login'));
  socket = io(ENDPOINT)
  console.log("socket: ", socket);
  
  if (selectedRoom) {
    getLog(selectedRoom);
    
    socket.emit('join', selectedRoom, (error) => {
      if(error)
        alert('에러코드[', error, ']');
      })  
    }
  }, [selectedRoom, ENDPOINT]);

  useEffect(() => {
    socket.on('message', (data) => {
      const { writer, message } = data;
      // setMessages((messages) => [...messages, { writer, message }]);
      setMessages(messages => {
        const newMessages = [...messages, { writer, message }];
        console.log('New Messages:', newMessages);
        return newMessages;
      });
      
    });
  }, [socket, messages])


  const sendMessage = (event) => {
    event.preventDefault()
    console.log("전송 클릭");
    const writer = user;

    if (message) {
    console.log(message)
    axios.post(`${API_URL}/chat/live_chat`, {
      room_id: selectedRoom,
      writer: user,
      chat: message,
    })
    .then((result) => {
      console.log("post 완료");
    })
    .catch((error) => {
      console.log("error: ", error);
    })

    //소켓 연결할 부분
    socket.emit('sendMessage', { writer, message });  
      setMessage('');
    }
  }

  const getLog = async(id) => {
    await axios.get(`${API_URL}/chat/chat`, {params:{ room_id: id }})
    .then((res)=>{
      const logs = res.data;
      setMessages(logs.map((log) => ({ writer: log.writer, message: log.chat || log.message })));

    })
    .catch((error)=> {
      console.log("error: ", error);
    })
  }

  const uploadFile = (files, previews) => {
    if (files.length > 0 && files.length <= 15) {
      const fileMessages = files.map((file, index) => ({
        user: user,
        text: previews[index],
        type: 'file',
      }));
  
      socket.emit('sendFileMessages', {
        user: user,
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
    console.log("updatedPreviews: ", updatedPreviews);
  };

  // if(writer === user) isSentByCurrentUser = true;
  // else isSentByCurrentUser = false;
  // console.log("true/false = ", isSentByCurrentUser);
  
  
  return (
    <div className='chat_room_Main'>
      {selectedUser ? 
      <div className='actived_room'>
        <div className='chat_room_info_main'>
          <div className='InnerContainer'>
            <h3>{selectedUser}님과의 채팅</h3>
          </div>
        </div> 
        <div>
        <BasicScrollToBottom className="messages">
          {messages.map((message, i) => {
            // console.log("messages: ", messages);
            // 각 메시지의 작성자를 추출
            // console.log("message: ", message);
            
            const messageWriter = message.writer;
            const messageContent = message.message;
            // console.log("작성자: ", messageWriter);
            // console.log("내용: ", messageContent);

            // const messageWriter = message.split(":")[0].trim();
            
            // 현재 사용자와 작성자가 동일한 경우 true, 아니면 false
            const isSentByCurrentUser = messageWriter === user;
            // console.log("isSentByCurrentUser: ", isSentByCurrentUser);

            return isSentByCurrentUser ? (
              <div className='messageContainer justifyEnd' key={i}>
                <div className='messageBox backgroundBlue'>
                  { 
                    images != null ? (
                    <>이미지가 나올 수 있을까요?</>
                    ):<></>
                  }
                <p className='messageText colorWhite'>{messageContent}</p>
                </div>
              </div>
              ) : (
              <div className='messageContainer justifyStart' key={i}>
                <div className='messageBox backgroundLight'>
                { 
                  images != null ? (
                  <>이미지가 나올 수 있을까요?</>
                  ):<></>
                }
                <p className='messageText colorDark'>{messageContent}</p>
                </div>
              </div>
              );
          })}
                     
        </BasicScrollToBottom>
        </div>

        {selectedFiles.length > 0 ? (
          <div className="file-previews-container">
          {selectedFiles.map((preview, index) => (
            <div key={index} className="file-previews">
              {
                preview.type && preview.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(preview)} alt={`File Preview ${index + 1}`} />
                  ) : (
                    <span>{preview.name}</span>
                )
              }
              <button
                type="button"
                className="cancel-button"
                onClick={() => deleteImage(index)}
              >
                <FaTimes />
              </button>
            </div>
            ))}
          </div>
          ):<></>}
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
      </div>
      :
      <div className='please_select'>
        <IoChatbubbleEllipsesOutline className='malpoongseon'/>
        <p>대화방을 선택해주세요</p>
      </div>
      }
    </div>
  )
}

export default Chat_room;