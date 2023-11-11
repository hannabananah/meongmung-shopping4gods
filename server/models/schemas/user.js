const { Schema } = require('mongoose');

// 유저 테이블
const userSchema = new Schema(
  {
    // 유저 이메일
    email: { type: String, required: true, unique: true },
    // 비밀번호
    password: { type: String, required: true },
    // 전화번호
    phone: {
      type: String,
      required: true,
      match: /^\d{3}-\d{3,4}-\d{4}$/,
      unique: true,
    },
    // 유저 이름
    name: { type: String, required: true },
    // 우편번호
    zipCode: { type: String, required: false },
    // 주소
    address: { type: String, required: false },
    // 관리자 여부
    isAdmin: { type: Boolean, default: false, required: true },
    // 회원탈퇴 여부
    useyn: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = userSchema;
