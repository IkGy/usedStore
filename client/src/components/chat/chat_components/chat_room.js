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
const ENDPOINT = 'http://54.180.101.110:5000'
// const ENDPOINT = 'http://localhost:5000'

function Chat_room({ selectedUser, selectedRoom, setSelectedUser }){
  console.log("Chat_room 진입");
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  let [modal, setmodal] = useState(false);
  let [selectimg, setSelectimg] = useState("");
  let chatFormData = new FormData();

  const uploadFile = (e) => {
    e.preventDefault();
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 10) {
      alert("파일은 최대 10개까지만 등록 가능합니다.");
    } else {
      const filesArray = Array.from(selectedFiles);
      setSelectedFiles(filesArray);
      console.log("selectedFiles: ", selectedFiles);
      console.log("filesArray: ", filesArray);


      chatFormData = new FormData();
      filesArray.forEach((file) => {
      chatFormData.append(`images`, file);
    });
    }  
  };
// ----------------------------------------------------- //


useEffect(() => {
  // console.log("ChatRoom에서 selecteduser: ", selectedUser);
  // console.log("ChatRoom에서 selectedroom: ", selectedRoom);
  setUser(getCookie('login'));
  socket = io(ENDPOINT);
  // console.log("socket: ", socket);
  
  if (selectedRoom) {
    getLog(selectedRoom);
    
    socket.emit('join', selectedRoom, (error) => {
      if(error)
        alert('에러코드[', error, ']');
      })  
    }
    return () => {
      // 컴포넌트가 언마운트될 때 소켓 연결 해제
      socket.disconnect();
    };
  }, [selectedRoom, ENDPOINT]);

  useEffect(() => {
    socket.on('message', async (data) => {
      const { writer, message, images } = data;
      console.log('Received message:', data);
      setMessages((messages) => {
        const newMessages = [...messages, { writer, message, images }];
        console.log('New Messages:', newMessages);
        return newMessages;
      });
    });
  }, [socket]);
  
  
  
  const sendMessage = async (event) => {
  event.preventDefault();
  console.log("전송 클릭");
  const writer = user;
  const images = selectedFiles;

  if (message.trim().length === 0 && selectedFiles.length === 0) console.log("전송하지 않습니다.");
  else {
    if (message || images) {
      console.log(message);
      console.log("selectedFiles: ", selectedFiles);
      chatFormData = new FormData();
      selectedFiles.forEach((file) => {
        chatFormData.append(`images`, file);
      });
      if (selectedFiles === undefined) setSelectedFiles(null);
      try {
        const response = await axios.post(`${API_URL}/chat/live_chat_upload_file_to_s3`, chatFormData);
        console.log('response: ', response);
        const s3Urls = response.data;
        console.log('s3Urls: ', s3Urls);

        axios.post(`${API_URL}/chat/live_chat`, {
          room_id: selectedRoom,
          writer: user,
          chat: message,
          images: s3Urls.map((url) => ({ path: url }))
        })
          .then((result) => {
            console.log("result: ", result);
            console.log("post 완료");

            // 이미지 URL을 사용하여 소켓으로 전송
            socket.emit('sendMessage', { writer: user, message: message, images: s3Urls });
          })
          .catch((error) => {
            console.log("error: ", error);
          });
          setMessage('');
          setSelectedFiles([]);
      } catch (error) {
        console.error("이미지 업로드 및 전송 오류:", error);
      }
    }
  }
};

const getLog = async(id) => {
  await axios.get(`${API_URL}/chat/chat`, {params:{ room_id: id }})
  .then((res)=>{
    const logs = res.data;
    setMessages(logs.map((log) => ({ writer: log.writer, message: log.chat || log.message, images: log.images })));
  })
  .catch((error)=> {
    console.log("error: ", error);
  })
}

  const deleteImage = (index) => {
    const updatedPreviews = [...selectedFiles];
    updatedPreviews.splice(index, 1);
    console.log("updatedPreviews: ", updatedPreviews);
    setSelectedFiles(updatedPreviews);
  };
  
  const closeRoom = () => {
    setSelectedUser('');
  }

  const openPreviewModal = (img) => {
    console.log("이미지를 확대하자");
    if (modal === false) {
      setmodal(true);
      setSelectimg(img);
    } else if (modal === true) {
      setmodal(false);
      setSelectimg("");
    }
  }







  return (
    <div className='chat_room_Main'>
      {selectedUser ? 
      <div className='actived_room'>
        <div className='chat_room_info_main'>
          <div className='InnerContainer'>
            <h3 className='info_who'>{selectedUser}님과의 채팅</h3>
          </div>
          <FaTimes className='close_room' onClick={closeRoom}/>
        </div> 
        <BasicScrollToBottom
          className={selectedFiles.length > 0 ? "messagesOnImages" : "messages" }
        >
          {messages.map((message, i) => {
            const messageWriter = message.writer;
            const messageContent = message.message;
            const messageImages = message.images;
            const isSentByCurrentUser = messageWriter === user;

            return (
              <div key={i} className={isSentByCurrentUser ? 'messageContainer justifyEnd' : 'messageContainer justifyStart'}>
                <div className={isSentByCurrentUser ? 'messageBox backgroundBlue' : 'messageBox backgroundLight'}>

                  {messageImages && messageImages.length > 0 ? (
                    <div className='imageContainer'>
                      {messageImages.map((image, index) => {
                        console.log("image: ", image);
                        console.log("Image URL:", image.path);
                        return (
                        <img 
                          key={`${index}-${image.path}`} 
                          className="messageImage" 
                          src={image.path||image} 
                          // src={`${image.path}?${Math.random()}`}
                          // src={image.path ? `${image.path}?${Date.now()}` : ''}  
                          alt={`Image ${index + 1}`} 
                          onClick={openPreviewModal}
                        />
                        );
                        })}
                    </div>
                  ) : null}
                  <p className={isSentByCurrentUser ? 'messageText colorWhite' : 'messageText colorDark'}>
                    {ReactEmoji.emojify(messageContent)}
                  </p>
                </div>
              </div>
            );
          })}
        </BasicScrollToBottom>
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
        <div className='chat_room_input_main'>
          <label htmlFor="file-upload" className="custom-file-upload">
            <FaRegPlusSquare />
          </label>

          <input
            id="file-upload"
            type="file"
            onChange={uploadFile}
            // onChange={imageUpload}
            multiple
          />

          <input
            className="input_area"
            type="text"
            placeholder="전송하려는 메시지를 입력하세요."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
          />

          <button 
            className="sendButton" 
            onClick={e => sendMessage(e)} >전송</button>
        </div>
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