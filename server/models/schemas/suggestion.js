const { Schema } = require('mongoose');

// 추천 테이블
const suggestionSchema = new Schema({
  // 제안내용
  text: {
    type: String,
    trim: true,
  },
  // 강아지 데이터
  dogs: [{ type: Schema.Types.ObjectId, ref: 'Dog', required: true }],
});

module.exports = suggestionSchema;
