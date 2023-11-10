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

exports.deleteOrder = async function (orderList) {
  console.log('오더리스트', orderList);
  if (!orderList) {
    throw new Error('주문 정보가 없습니다.');
  }
  try {
    for (item of orderList.list) {
      console.log(item);
      await models.Order.deleteOne({ _id: item }).exec();
    }
    return;
  } catch (err) {
    throw new Error('삭제 실패' + err);
  }
};

exports.deleteOrderByOrderId = async function (orderId, orderList) {
  if (!orderId && orderList) {
    for (item in orderList) {
      await models.Order.deleteOne({ _id: item }).exec();
    }
    return;
  }

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
