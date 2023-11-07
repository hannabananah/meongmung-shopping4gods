const { Router } = require('express');
const adminOrderController = require('../controllers/adminOrderController');
const { isAdmin } = require('../middleware/isAdmin');
const validator = require('../middleware/validator');
const { admin } = require('../middleware/validators');

const router = Router();

// 모든 유저 주문 정보 조회
router.get('/admins/orders', isAdmin, adminOrderController.getAllOrders);

// 특정 유저의 모든 주문 조회
router.get(
  '/admins/users/:userId/orders',
  isAdmin,
  adminOrderController.getAllOrdersByUserId,
);

// 특정 주문 조회
router.get(
  '/admins/orders/:orderId',
  isAdmin,
  adminOrderController.getOrdersByOrderId,
);

// 특정 주문 수정
router.put(
  '/admins/orders/:orderId',
  isAdmin,
  validator(admin.update),
  adminOrderController.updateOrderByOrderId,
);

// 특정 주문 삭제
router.delete(
  '/admins/orders/:orderId',
  isAdmin,
  adminOrderController.deleteOrderByOrderId,
);

// 특정 선택된 주문 삭제
router.delete(
  '/admins/orders/cancel',
  isAdmin,
  adminOrderController.deleteOneOrder,
);

module.exports = router;
