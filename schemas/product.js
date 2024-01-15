const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');
const { Schema } = mongoose;

const productSchema = new Schema({
// 상품 id
id: {
  type: String,
  required: true, // null 여부
  unique: true, // 유니크 여부
},
// 판매자
seller: {
  type: String,
  require: true
},
// 구매자
buyer: {
  type: String,
  require: false
},
// 카테고리
category: {
  type: String,
  require: true
},
// 판매글 제목
title: {
  type: String,
  require: true
},
// 판매글 내용
comment: {
  type: String,
  require: true
},
// 상품 상태
product_status: {
  type: String,
  require: true
},
// 환불 가능 여부
refund: {
  type: Boolean,
  require: true
},
// 가격 
price: {
  type: Int32,
  require: true
},
// 거래 지역
location: {
  type: String,
  require: true
},
// 태그
tags: {type: String},
// 수량
count: {
  type: Int32,
  require: true
},
// 이미지
images: {
  type: Image,
  require: true
},
// 판매 여부(상태)
status: {
  type: String,
  require: true
},
// 판매글 작성 날짜
created_at: {
  type: Date,
  require: true
},
// 판매글 수정 날짜
updated_at: {
  type: Date,
  require: false
},
// 거래 방법
order_type: {
  type: String,
  require: true
}
});

module.exports = mongoose.module('Product', productSchema);