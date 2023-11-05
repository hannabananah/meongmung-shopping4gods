const { Schema } = require('mongoose');

// 카테고리 테이블
const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { collection: 'category', strictPopulate: false },
);

module.exports = categorySchema;
