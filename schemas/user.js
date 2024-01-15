const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    // 계정 아이디
    id: {
        type: String,
        required: true, // null 여부
        unique: true, // 유니크 여부
    },
    // 계정 비밀번호
    password: {
        type: String,
        required: true,
    },
    // 실명
    real_name: {
        type: String,
        required: true,
    },
    // 사용자 타입
    role: {
        type: String,
        default: user, // 기본값 : user
    },
    // 닉네임
    user_name: {
        type: String,
        required: true,
    },
    // 소개
    about: {type: String},
    // 주소
    address: {
        type: String,
        required: true,
    },
    // 이메일
    email: {
        type: String,
        required: true,
    },
    // 전화번호
    phone_number: {
        type: Number,
        required: true,
    },
    // 생성 날짜
    created_at: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.module('User', userSchema);