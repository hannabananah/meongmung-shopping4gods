const models = require('../models/index');

// 유저 주문 조회
exports.getAllOrderById = async (userId) => {
  try {
    const orders = await models.Order.find({ userId }).exec();
    if (orders.length === 0) {
      const err = {
        status: 400,
        message: '해당 주문이 존재하지 않습니다.',
      };
      return err;
    }

    return orders;
  } catch (err) {
    throw new Error('서버 오류 입니다.');
  }
};

// 유저 특정 주문 조회
exports.getOneOrderById = async (userId, orderId) => {
  try {
    const order = await models.Order.findOne({ userId, orderId }).exec();
    if (!order) {
      const err = {
        status: 400,
        message: '해당 주문이 존재하지 않습니다.',
      };
      return err;
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
    }).exec();

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
    ).exec();

    if (!order) {
      const err = {
        status: 400,
        message: '해당 주문이 존재하지 않습니다.',
      };
      return err;
    }

    return order;
  } catch (err) {
    throw new Error('서버 오류 입니다.');
  }
};

// 주문 전체 삭제
exports.deleteOrderAll = async (userId) => {
  try {
    return await models.Order.deleteMany({ userId }).exec();
  } catch (err) {
    throw new Error('삭제 할 수 없습니다.');
  }
};

// 주문 개별 삭제
exports.deleteOrder = async (userId, orderId) => {
  try {
    return await models.Order.deleteOne({
      userId: userId,
      orderId: orderId,
    }).exec();
  } catch (err) {
    throw new Error('삭제 할 수 없습니다.');
  }
};
