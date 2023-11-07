const models = require('../models');
const userService = require('../services/userService');

exports.getAllOrders = async function () {
  const orders = await models.Order.find({})
    .populate({ path: 'userId', select: 'email phone name' })
    .populate({ path: 'products.product', select: 'name price' })
    .populate({ path: 'address', select: 'zipCode detailAddress recipient' })
    .exec();
  return orders;
};

exports.getAllOrdersByUserId = async function (userId) {
  const isExist = await userService.getUserById(userId);

  if (!isExist) {
    throw new Error('유저 정보를 찾을 수 없습니다.');
  }

  const orders = await models.Order.find({})
    .populate({ path: 'userId', match: { _id: userId }, select: 'name phone' })
    .populate({ path: 'products.product', select: 'name price' })
    .populate({ path: 'address', select: 'zipCode detailAddress recipient' })
    .exec();

  const filtered = orders.filter((order) => order.userId);

  return filtered;
};

exports.getOrdersByOrderId = async function (orderId) {
  const order = await models.Order.findOne({ _id: orderId })
    .populate({
      path: 'userId',
      select: 'name phone',
    })
    .exec();

  if (!order) {
    throw new Error('주문 정보가 없습니다.');
  }

  return order;
};

exports.updateOrderByOrderId = async function (orderData) {
  const { orderId, totalPrice, deliveryFee, status } = orderData;
  const order = await models.Order.findOne({ _id: orderId }).exec();

  if (!order) {
    throw new Error('주문 정보가 없습니다.');
  }

  try {
    const result = await models.Order.updateOne(
      { _id: orderId },
      {
        totalPrice,
        deliveryFee,
        status,
      },
    ).exec();

    return result;
  } catch (err) {
    throw new Error('수정 실패');
  }
};

exports.deleteOrderByOrderId = async function (orderId) {
  const order = await models.Order.findOne({ _id: orderId }).exec();

  if (!order) {
    throw new Error('주문 정보가 없습니다.');
  }

  try {
    const result = await models.Order.deleteOne({ _id: orderId }).exec();

    return result;
  } catch (err) {
    throw new Error('삭제 실패');
  }
};

// 선택된 주문 취소
exports.cancelSelectedOrders = async function (orderIds) {
  try {
    const orders = await models.Order.find({
      _id: { $in: orderIds },
      status: '배송전',
    });

    if (orders.length === 0) {
      throw new Error('선택한 주문을 취소할 수 없습니다.');
    }

    // 선택한 주문을 삭제
    for (const order of orders) {
      await order.remove();
    }
  } catch (err) {
    throw err;
  }
};
