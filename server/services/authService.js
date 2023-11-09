const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('../common/utils/jwt');
const config = require('../config');

exports.signup = async function (email, password, phone, name) {
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(config.bcrypt.saltRounds),
    );

    const result = await models.User.create({
      email,
      password: hashedPassword,
      phone,
      name,
    });

    const token = jwt.createToken(result.email, result.isAdmin);
    return token;
  } catch (err) {
    throw new Error(err);
  }
};

exports.login = async function (email, password) {
  const user = await models.User.findOne({ email }).exec();

  if (user.useyn) {
    throw new Error('없거나 탈퇴된 계정입니다.');
  }

  if (!user) {
    throw new Error('이메일과 비밀번호를 확인해 주세요.');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('이메일과 비밀번호를 확인해 주세요.');
  }

  const token = jwt.createToken(user.email, user.isAdmin);
  return token;
};
