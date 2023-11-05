const orderService = require('../services/orderService');

exports.getAllOrdersById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orders = await orderService.getAllOrderById(userId).exec();
    res.json({
      status: 200,
      orders,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOneOrderById = async (req, res, next) => {
  const { userId, orderId } = req.params;
  try {
    const order = await orderService.getOneOrderById(userId, orderId).exec();
    res.json({
      status: 200,
      order,
    });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const {
      orderId,
      totalPrice,
      userId,
      products,
      shippingAddress,
      deliveryFee,
      status,
    } = req.body;
    const carts = await orderService
      .createOrder({
        orderId,
        totalPrice,
        userId,
        products,
        shippingAddress,
        deliveryFee,
        status,
      })
      .exec();

    res.status(200).json({
      status: 200,
      carts,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: '서버 오류 입니다.',
    });
  }
};

exports.updateOrder = async (req, res, next) => {
  const { userId, orderId } = req.params;
  const { totalPrice } = req.body;

  try {
    const updatedOrder = await orderService
      .updateOrder(userId, orderId, {
        totalPrice,
      })
      .exec();
    res.json({
      status: 200,
      order: updatedOrder,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAllOrder = async (req, res, next) => {
  const { userId } = req.params;

  await orderService.deleteOrderAll(userId).exec();

  try {
    res.json({
      status: 200,
      message: '삭제 성공',
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteOneOrder = async (req, res, next) => {
  const { userId, orderId } = req.params;

  try {
    await orderService.deleteOrder(userId, orderId).exec();

    res.json({
      status: 200,
      message: '삭제 성공',
    });
  } catch (err) {
    next(err);
  }
};
