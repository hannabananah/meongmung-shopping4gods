const { Router } = require('express');
const userController = require('../controllers/userController');
const validator = require('../middleware/validator');
const { user } = require('../middleware/validators');
const { isAuth } = require('../middleware/isAuth');
const { isAdmin } = require('../middleware/isAdmin');
const router = Router();

// 전체 유저 조회
router.get('/users', isAdmin, userController.getAllUsers);

// 유저 정보 조회
router.get('/users/me', isAuth, userController.getUserById);

// 유저 생성 - (deprecated)
// router.post('/users', userController.createUser);

// 유저 수정
router.put(
  '/users',
  isAuth,
  validator(user.updateUser),
  userController.updateUser,
);

// 유저 삭제
router.delete('/users', isAuth, userController.deleteUser);

module.exports = router;
