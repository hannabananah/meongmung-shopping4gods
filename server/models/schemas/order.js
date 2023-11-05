const { Schema } = require('mongoose');

// 주문 테이블
const orderSchema = new Schema(
  {
    // 주문 코드
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    // 주문 총 금액
    totalPrice: {
      type: Number,
      required: true,
    },
    // 주문자 아이디
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: 'ShippingAddress',
    },
    // 배송비
    deliveryFee: {
      type: Number,
    },
    // 1: 배송전, 2: 배송중, 3: 배송완료
    status: {
      type: String,
      enum: ['배송전', '배송중', '배송완료'],
      required: true,
      default: '배송전',
    },
  },
  {
    timestamps: true,
  },
);
module.exports = orderSchema;
