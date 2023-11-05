const { Router } = require('express');
const orderController = require('../controllers/orderController');
const { isAuth } = require('../middleware/isAuth');

const router = Router();

// 유저의 전체 주문 조회
router.get('/orders/:userId', isAuth, orderController.getAllOrdersById);

// 유저의 특정 주문 조회
router.get('/orders/:userId/:orderId', isAuth, orderController.getOneOrderById);

// 주문 생성
router.post('/orders', isAuth, orderController.createOrder);

// 주문 수정
router.put('/orders/:userId/:orderId', isAuth, orderController.updateOrder);

// 전체 주문 삭제
router.delete('/orders/:userId', isAuth, orderController.deleteAllOrder);

// 특정 주문 삭제
router.delete('/orders/:userId/:orderId', isAuth, orderController.deleteOneOrder);

module.exports = router;
