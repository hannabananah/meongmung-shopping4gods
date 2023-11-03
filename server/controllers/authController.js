const { User } = require('../models');
const authService = require('../services/authService');

exports.signup = async (req, res, next) => {
  const { email, password, phone, name } = req.body;

  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    return res
      .status(409)
      .json({ status: 409, message: `${email}은 이미 가입된 이메일 입니다.` });
  }

  const token = await authService.signup(email, password, phone, name);
  res.status(200).json({ token });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ token, message: '로그인 성공' });
  } catch (err) {
    next(err.message);
  }
};
