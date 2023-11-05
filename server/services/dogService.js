const models = require('../models/index');

exports.getAllDogs = async () => {
  try {
    return await models.Dog.find({}).exec();
  } catch (err) {
    throw new Error('강아지 정보를 찾을 수 없습니다.');
  }
};

exports.getDogById = async (id) => {
  try {
    const dog = await models.Dog.findOne({ id }).exec();

    if (!dog) {
      const err = {
        status: 400,
        message: '해당하는 강아지를 찾을 수 없습니다.',
      };
      return err;
    }

    return dog;
  } catch (err) {
    throw new Error('서버 오류 입니다.');
  }
};

exports.createDog = async (dog) => {
  try {
    return await models.Dog.create(dog).exec();
  } catch (err) {
    throw new Error('등록 할 수 없습니다.');
  }
};

exports.updateDog = async (id, dog) => {
  try {
    return await models.Dog.updateOne({ id }, { ...dog }).exec();
  } catch (err) {
    throw new Error('업데이트 할 수 없습니다.');
  }
};

exports.deleteDog = async (id) => {
  try {
    return await models.Dog.deleteOne({ id }).exec();
  } catch (err) {
    throw new Error('삭제 할 수 없습니다.');
  }
};
