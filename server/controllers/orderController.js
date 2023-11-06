const orderService = require('../services/orderService');

exports.getAllOrdersById = async (req, res, next) => {
  const userId = req.userId;
  try {
    const orders = await orderService.getAllOrderById(userId);
    res.json({ status: 200, orders });
  } catch (err) {
    next(err);
  }
};

exports.getOneOrderById = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const order = await orderService.getOneOrderById(orderId);
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
    const userId = req.userId;
    const { totalPrice, products, address, deliveryFee } = req.body;

    const order = await orderService.createOrder({
      userId,
      totalPrice,
      products,
      address,
      deliveryFee,
    });

    res.json({
      status: 201,
      message: '주문 성공',
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { products, address } = req.body;

  try {
    const orderStatus = await orderService.getOneOrderById(orderId);

    if (orderStatus.status !== '배송전') {
      return res.status(400).json({
        status: 400,
        message: '주문이 이미 배송에 착수되어 수정이 불가합니다.',
      });
    }

    const updatedOrder = await orderService.updateOrder(orderId, {
      products,
      address,
    });
    res.json({
      status: 200,
      order: updatedOrder,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAllOrder = async (req, res, next) => {
  const userId = req.userId;

  try {
    // 배송전 주문만 삭제
    const orderList = await orderService.getAllOrderById(userId);

    const deliveryPreparation = orderList.filter(
      (order) => order.status === '배송전',
    );

    if (deliveryPreparation.length === 0) {
      return res.status(400).json({
        status: 400,
        message: '배송전 단계의 주문이 없습니다.',
      });
    }

    for (const order of deliveryPreparation) {
      await orderService.deleteOrder(order._id);
    }
    res.json({
      status: 200,
      message: '삭제 성공',
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteOneOrder = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const order = await orderService.getOneOrderById(orderId);

    if (order.userId._id.toString() !== req.userId) {
      return res.status(400).json({
        status: 400,
        message: '자신의 주문만 삭제가 가능합니다.',
      });
    }

    if (order.status !== '배송전') {
      return res.status(400).json({
        status: 400,
        message: '주문이 이미 배송에 착수되어 삭제가 불가합니다.',
      });
    }

    await orderService.deleteOrder(orderId);

    res.json({
      status: 200,
      message: '삭제 성공',
    });
  } catch (err) {
    next(err);
  }
};
