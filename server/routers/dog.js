const { Router } = require('express');
const dogController = require('../controllers/dogController');
const { isAuth } = require('../middleware/isAuth');
const validator = require('../middleware/validator');
const { dog } = require('../middleware/validators');

const router = Router();

// 유저의 전체 강아지 조회
router.get('/dogs', isAuth, dogController.getAllDogs);

// 강아지 정보 조회
router.get('/dogs/:dogId', isAuth, dogController.getDogById);

// 강아지 생성
router.post('/dogs', isAuth, validator(dog.create), dogController.createDog);

// 강아지 수정
router.put(
  '/dogs/:dogId',
  isAuth,
  validator(dog.update),
  dogController.updateDog,
);

// 강아지 삭제
router.delete('/dogs/:dogId', isAuth, dogController.deleteDog);

module.exports = router;
