const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const router = Router();

// 전체 카테고리 조회
router.get('/categories', categoryController.getAllCategory);

// 특정 카테고리 상품 조회
router.get(
  '/categories/:name/products',
  categoryController.getProductByCategoryName,
);

// 카테고리 생성
router.post('/categories', categoryController.createCategory);

// 카테고리 수정
router.put('/categories/:id', categoryController.updateCategory);

// 카테고리 삭제
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
