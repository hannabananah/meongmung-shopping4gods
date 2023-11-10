const models = require('../models');

// 유저 주문 조회
exports.getAllOrderById = async (userId) => {
  try {
    const orders = await models.Order.find({ userId })
      .populate({ path: 'userId', select: 'email phone name' })
      .populate({ path: 'products.product', select: 'name price' })
      .populate({ path: 'address', select: 'zipCode detailAddress recipient' })
      .exec();

    return orders;
  } catch (err) {
    throw new Error(err);
  }
};

// 유저 특정 주문 조회
exports.getOneOrderById = async (_id) => {
  try {
    const order = await models.Order.findOne({ _id })
      .populate({ path: 'userId', select: 'email phone name' })
      .populate({ path: 'products.product', select: 'name price' })
      .populate({ path: 'address', select: 'zipCode detailAddress recipient' })
      .exec();

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
  userId,
  totalPrice,
  products,
  address,
  deliveryFee,
}) => {
  console.log(userId, totalPrice, products, address);

  const order = await models.Order.create({
    totalPrice,
    userId,
    products,
    address,
    deliveryFee,
    status: '배송전',
  });

  return order;
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
    throw new Error(err);
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
