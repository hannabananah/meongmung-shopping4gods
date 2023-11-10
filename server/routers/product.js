const { Router } = require('express');
const productController = require('../controllers/productController');
const { isAdmin } = require('../middleware/isAdmin');
const validator = require('../middleware/validator');
const { product } = require('../middleware/validators');

const router = Router();

// 전체 상품 조회
router.get('/products', productController.getAllProducts);

// 상품 상세 조회
router.get('/products/:id', productController.getProductById);

// 상품 생성
router.post(
  '/products',
  isAdmin,
  validator(product.create),
  productController.createProduct,
);

// 상품 수정
router.put(
  '/products/:id',
  isAdmin,
  validator(product.update),
  productController.updateProduct,
);

// 전체 상품 삭제
router.delete('/products', isAdmin, productController.deleteAllProducts);


// 특정 상품 삭제
router.delete('/products/:id', isAdmin, productController.deleteProduct);

module.exports = router;
