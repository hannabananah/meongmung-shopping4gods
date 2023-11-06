const models = require('../models');

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
    throw new Error('서버 오류 입니다.' + err);
  }
};

// 유저 특정 주문 조회
exports.getOneOrderById = async (orderId) => {
  try {
    const order = await models.Order.findOne({ _id: orderId }).exec();
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
exports.createOrder = async (orderData) => {
  const {
    orderId,
    totalPrice,
    userId,
    products,
    address,
    deliveryFee,
    status,
  } = orderData;

  try {
    const existingOrder = await models.Order.findOne({ orderId }).exec();

    if (existingOrder) {
      return { error: '해당 주문코드가 이미 존재합니다.' };
    }

    const order = await models.Order.create({
      orderId,
      totalPrice,
      userId,
      products,
      address,
      deliveryFee,
      status,
    });
    return order;
  } catch (err) {
    throw new Error('주문 생성 중에 오류가 발생했습니다.');
  }
};

// 주문 수정하기
exports.updateOrder = async (orderId, updateData) => {
  try {
    const order = await models.Order.findOneAndUpdate(
      { _id: orderId },
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
    await models.Order.deleteMany({ userId }).exec();
  } catch (err) {
    throw new Error('삭제 할 수 없습니다.');
  }
};

// 주문 개별 삭제
exports.deleteOrder = async (orderId) => {
  try {
    return await models.Order.deleteOne({
      _id: orderId,
    }).exec();
  } catch (err) {
    throw new Error('삭제 할 수 없습니다.');
  }
};
