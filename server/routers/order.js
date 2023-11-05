const { Router } = require('express');
const orderController = require('../controllers/orderController');
const { isAuth } = require('../middleware/isAuth');

const router = Router();

// 유저의 전체 주문 조회
router.get('/orders', isAuth, orderController.getAllOrdersById);

// 유저의 특정 주문 조회
router.get('/orders/:orderId', isAuth, orderController.getOneOrderById);

// 주문 생성
router.post('/orders', isAuth, orderController.createOrder);

// 주문 수정
router.put('/orders/:orderId', isAuth, orderController.updateOrder);

// 전체 주문 삭제
router.delete('/orders', isAuth, orderController.deleteAllOrder);

// 특정 주문 삭제
router.delete('/orders/:orderId', isAuth, orderController.deleteOneOrder);

module.exports = router;
