const models = require('../models');

exports.getAllDogs = async (userId) => {
  try {
    const dogs = await models.Dog.find({ userId }).exec();
    if (dogs.length === 0) {
      const err = {
        status: 400,
        message: '등록된 강아지 정보가 없습니다.',
      };
      return err;
    }

    return dogs;
  } catch (err) {
    throw new Error('강아지 정보를 찾을 수 없습니다.');
  }
};

exports.getDogById = async (userId, dogId) => {
  try {
    const dog = await models.Dog.findOne({ userId, _id: dogId }).exec();

    if (!dog) {
      const err = {
        status: 404,
        message: '해당하는 강아지를 찾을 수 없습니다.',
      };
      return err;
    }

    return dog;
  } catch (err) {
    throw new Error('서버 오류 입니다.');
  }
};

exports.createDog = async (dogData) => {
  try {
    const createdDog = await models.Dog.create(dogData);
    return createdDog;
  } catch (err) {
    throw new Error('등록 할 수 없습니다.');
  }
};

exports.updateDog = async (dogId, updatedData) => {
  try {
    const updatedDog = await models.Dog.findByIdAndUpdate(dogId, updatedData, {
      new: true,
    });
    if (!updatedDog) {
      throw new Error('해당 ID의 강아지를 찾을 수 없습니다.');
    }
    return updatedDog;
  } catch (err) {
    throw new Error('업데이트 할 수 없습니다.');
  }
};

exports.deleteDog = async (dogId) => {
  try {
    const deletedDog = await models.Dog.findByIdAndDelete(dogId);
    if (!deletedDog) {
      throw new Error('해당 ID의 강아지를 찾을 수 없습니다.');
    }
    return deletedDog;
  } catch (err) {
    throw new Error('삭제 할 수 없습니다.');
  }
};
