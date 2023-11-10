const { User } = require('../models');
const authService = require('../services/authService');

exports.signup = async (req, res, next) => {
  try {
    const { email, password, phone, name } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({
          status: 400,
          message: `${email}은 이미 가입된 이메일 입니다.`,
        });
    }

    const token = await authService.signup(email, password, phone, name);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
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

exports.logout = async (req, res, next) => {
  const { name } = req.user;

  res.json({ message: `${name}님 안녕히 가세요~` });
};
