const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  // 리뷰 id
  id: {
    type: String,
    require: true,
    unique: true
  },
  // 리뷰 받은 사용자 (판매자)
  receiver:{
    type: String,
    require: true
  }, 
  // 리뷰 작성자 (구매자)
  writer: {
    type: String,
    require: true
  },
  // 리뷰 작성 시간
  created_at: {
    type: Date,
    require: true
  },
  // 리뷰 수정 시간
  updated_at: {
    type: Date,
    require: false
  },
  // 리뷰 내용
  comment: {
    type: String,
    require: true
  }
});

module.exports = mongoose.module('Review', reviewSchema);