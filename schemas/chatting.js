const mongoose = require('mongoose');
const { Schema } = mongoose;

const chattingSchema = new Schema({
    // 채팅내역 id
    id: {
      type: String,
      require: true,
      unique: true
    },
    // 채팅방 id
    room_id:{
      type: String,
      require: true,
      unique: true
    },
    // 작성자
    writer: {
      type: String,
      require: true
    },
    // 채팅 내용
    chat: {
      type: String,
      require: false
    },
    // 이미지 첨부
    images: {
      type: Image, 
      default: null,
      require: false
    },
    // 채팅 시간
    created_at: {
      type: Date,
      require: true
    }
});

module.exports = mongoose.module('chatting', chattingSchema);