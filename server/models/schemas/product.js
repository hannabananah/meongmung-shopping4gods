const { Schema } = require('mongoose');

// 상품 테이블
const productSchema = new Schema(
  {
    // 제품명
    name: { type: String, required: true },
    // 제품 분류(카테고리)
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    // 제품 이미지
    img_url: { type: String, required: true },
    // 제품 설명
    desc: { type: String, required: true },
    // 가격
    price: { type: Number, required: true },
    // 제품 간략설명
    summary: { type: String },
    // 할인여부
    discount: { type: Boolean },
    // 신상여부
    isNewArrival: { type: Boolean },
    // 제조사
    manufacturer: { type: String, required: true },
    // 추천상품을 위한 강아지 나이
    recommendDogAge: {
      min: Number,
      max: Number,
    },
    // 추천상품을 위한 강아지 크기
    recommendDogSize: [
      {
        type: String,
        enum: ['초소형견', '소형견', '중형견', '대형견', '초대형견'],
      },
    ],
  },
  {
    timestamps: true,
    strictPopulate: false,
  },
);

module.exports = productSchema;
