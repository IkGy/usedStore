const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
  // 찜 id
  id: {
    type: String,
    require: true,
    unique: true
  },
  // 찜한 사용자 
  liker: {
    type: String,
    require: true
  },
  // 상품 id
  product_id:{
    type: String,
    require: true
  }
});

module.exports = mongoose.module('Like', likeSchema);