const dogService = require('../services/dogService');

exports.getAllDogs = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const dogList = await dogService.getAllDogs(userId);
    res.json({ status: 200, dogList });
  } catch (err) {
    next(err);
  }
};

exports.getDogById = async (req, res, next) => {
  const userId = req.user._id;
  const { dogId } = req.params;

  try {
    const dog = await dogService.getDogById(userId, dogId);
    if (!dog) {
      res.status(404).json({
        status: 404,
        message: '강아지를 찾을 수 없습니다.',
      });
    } else {
      res.status(200).json({
        status: 200,
        dog,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.createDog = async (req, res, next) => {
  const { userId, dogId, name, size, age } = req.body;
  try {
    const createdDog = await dogService.createDog({
      userId,
      dogId,
      name,
      size,
      age,
    });
    res.status(200).json({
      status: 200,
      message: '등록 성공',
      createdDog,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: '서버 오류 입니다.',
    });
  }
};

exports.updateDog = async (req, res, next) => {
  const { dogId } = req.params;
  const { name, age, size } = req.body;
  const updatedDogData = { name, age, size };

  try {
    await dogService.updateDog(dogId, updatedDogData);
    res.json({
      status: 200,
      message: '수정 성공',
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteDog = async (req, res, next) => {
  const { dogId } = req.params;
  try {
    const deletedDog = await dogService.deleteDog(dogId);
    if (deletedDog) {
      res.json({
        status: 200,
        message: '삭제 성공',
      });
    } else {
      res.status(404).json({
        status: 404,
        message: '강아지를 찾을 수 없습니다.',
      });
    }
  } catch (err) {
    next(err);
  }
};
