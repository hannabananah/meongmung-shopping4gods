const models = require('../models');

exports.getAllUsers = async () => {
  return await models.User.find({}).exec();
};

exports.getUserById = async (_id) => {
  try {
    return await models.User.findOne(
      { _id },
      { useyn: false, password: false },
    ).exec();
  } catch (err) {
    throw new Error(err);
  }
};

exports.createUser = async (user) => {
  // 생성하기전 db에 유저가 있는지 확인.
  const userCheck = this.getUserById(user._id);

  // 유저가 있다면 에러 메세지를 준다.
  if (!userCheck) {
    return false;
  }

  return await models.User.create(user);
};

exports.updateUser = async (_id, phone, name) => {
  try {
    // 전화번호가 이미 존재하는지 확인
    const existingUser = await models.User.findOne({ phone });

    if (existingUser && existingUser._id.toString() !== _id) {
      return { status: 400, message: '해당 전화번호가 이미 존재합니다.' };
    }

    const data = await models.User.updateOne({ _id }, { phone, name }).exec();
    if (!data.acknowledged) {
      return { status: 200, message: '수정 실패' };
    }
    return { status: 200, massage: '수정 성공' };
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteUser = async (_id) => {
  try {
    await models.User.deleteOne({ _id }).exec();

    return { status: 200, message: '탈퇴 성공' };
  } catch (err) {
    throw new Error(err);
  }
};

exports.disableAccountUser = async (_id) => {
  try {
    return await models.User.updateOne({ _id }, { useyn: true }).exec();
  } catch (err) {
    throw new Error(err);
  }
};
