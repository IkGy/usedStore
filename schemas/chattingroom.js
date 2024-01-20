const mongoose = require('mongoose');
const { Schema } = mongoose;

const chattingroomSchema = new Schema({
  // 채팅방 id
  id: {
    type: String,
    require: true,
    unique: true
  },
  // 개설 시간
  created_at: {
    type: Date,
    require: true
  },
  // 구성원
  users: {
    type: Array,
    require: true
  }
});

module.exports = mongoose.module('chattingroom', chattingroomSchema);