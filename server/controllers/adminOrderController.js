const adminOrderService = require('../services/adminOrderService');

exports.getAllOrders = async function (req, res, next) {
  try {
    const orders = await adminOrderService.getAllOrders();

    res.json({ status: 200, orders });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrdersByUserId = async function (req, res, next) {
  console.log('userId');
  try {
    const { userId } = req.params;

    if (userId === null) {
      return res.json({
        status: 400,
        message: '해당 유저 정보를 찾을 수 없습니다.',
      });
    }

    const orders = await adminOrderService.getAllOrdersByUserId(userId);

    res.json({ status: 200, orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrdersByOrderId = async function (req, res, next) {
  console.log('orderId');
  try {
    const { orderId } = req.params;

    if (orderId === null) {
      return res.json({
        status: 400,
        message: '해당 주문 정보를 찾을 수 없습니다.',
      });
    }

    const order = await adminOrderService.getOrdersByOrderId(orderId);

    res.json({ status: 200, order });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderByOrderId = async function (req, res, next) {
  try {
    const { orderId } = req.params;
    const { totalPrice, deliveryFee, status } = req.body;

    const orderData = {
      orderId,
      totalPrice,
      deliveryFee,
      status,
    };

    await adminOrderService.updateOrderByOrderId(orderData);

    res.json({ state: 200, message: '수정 성공' });
  } catch (err) {
    next(err.message);
  }
};

exports.deleteOrderByOrderId = async function (req, res, next) {
  try {
    const { orderId } = req.params;
    await adminOrderService.deleteOrderByOrderId(orderId);

    res.json({ state: 200, message: '삭제 성공' });
  } catch (err) {
    next(err.message);
  }
};
