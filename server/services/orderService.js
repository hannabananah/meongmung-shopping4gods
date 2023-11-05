const models = require('../models/index');

// 전체 주문 조회
exports.getAllOrder = async () => {
  return await models.Order.find({});
};

// 유저 주문 조회
exports.getAllOrderById = async (userId) => {
  try {
    const orders = await models.Order.find({ userId });
    if (orders.length === 0) {
      const error = {
        status: 400,
        message: '해당 주문이 존재하지 않습니다.',
      };
      return error;
    }

    return orders;
  } catch (err) {
    throw new Error('서버 오류 입니다.');
  }
};

// 유저 특정 주문 조회
exports.getOneOrderById = async (userId, orderId) => {
  try {
    const order = await models.Order.findOne({ userId, orderId });
    if (!order) {
      const error = {
        status: 400,
        message: '해당 주문이 존재하지 않습니다.',
      };
      return error;
    }

    return order;
  } catch (err) {
    throw new Error('서버 오류 입니다.');
  }
};

// 주문하기
exports.createOrder = async ({
  orderId,
  totalPrice,
  userId,
  products,
  shippingAddress,
}) => {
  try {
    const createdOrder = await models.Order.create({
      orderId,
      totalPrice,
      userId,
      products,
      shippingAddress,
    });

    return createdOrder;
  } catch (err) {
    throw new Error('주문 생성 중에 오류가 발생했습니다.');
  }
};

// 주문 수정하기
exports.updateOrder = async (userId, orderId, updateData) => {
  try {
    const order = await models.Order.findOneAndUpdate(
      { userId, orderId },
      { $set: updateData },
      { new: true },
    );

    if (!order) {
      const error = {
        status: 400,
        message: '해당 주문이 존재하지 않습니다.',
      };
      return error;
    }

    return order;
  } catch (err) {
    throw new Error('서버 오류 입니다.');
  }
};

// 주문 전체 삭제
exports.deleteOrderAll = async (userId) => {
  try {
    const order = await models.Order.deleteMany({ userId });
    return order;
  } catch (err) {
    throw new Error('삭제 할 수 없습니다.');
  }
};

// 주문 개별 삭제
exports.deleteOrder = async (userId, orderId) => {
  try {
    const order = await models.Order.deleteOne({ userId: userId, orderId: orderId });
    return order;
  } catch (err) {
    throw new Error('삭제 할 수 없습니다.');
  }
};
