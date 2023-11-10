const { Router } = require('express');
const addressController = require('../controllers/addressController');
const { isAuth } = require('../middleware/isAuth');
const validator = require('../middleware/validator');
const { address } = require('../middleware/validators');

const router = Router();

// 유저의 주소목록 조회
router.get('/addresses', isAuth, addressController.getAllAddresses);

// 하나의 주소 정보 조회
router.get('/addresses/:id', isAuth, addressController.getAddressById);

// 주소 생성
router.post(
  '/addresses',
  isAuth,
  validator(address.create),
  addressController.createAddress,
);

// 주소 수정
router.put(
  '/addresses/:id',
  isAuth,
  validator(address.update),
  addressController.updateAddress,
);

// 주소 삭제
router.delete('/addresses/:id', isAuth, addressController.deleteAddress);

module.exports = router;
