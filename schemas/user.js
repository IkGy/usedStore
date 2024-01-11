const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    // 아이디
    id: {
        type: String,
        required: true, // null 여부
        unique: true, // 유니크 여부
    },
    // 비밀번호
    password: {
        type: String,
        required: true,
    },
    // 실제이름
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
        typpe: String,
        required: true,
    }
});

module.exports = mongoose.module('User', userSchema);