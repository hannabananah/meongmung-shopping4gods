const userService = require('../services/userService');

exports.getAllUsers = async (req, res, next) => {
  try {
    const userList = await userService.getAllUsers();
    res.json(userList);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const id = req.userId;

    const user = await userService.getUserById(id);

    if (!user) {
      res
        .status(404)
        .json({ status: 404, message: '유저를 찾을 수 없습니다.' });
    }

    res.status(200).json({ status: 200, user });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const user = req.body;

  try {
    const result = await userService.createUser({
      ...user,
      phone: parseInt(user.phone),
    });
    if (!result) {
      res.status(400).json({});
    }

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const id = req.userId;
  const { phone, name } = req.body;

  try {
    const data = await userService.updateUser(id, phone, name);

    if (data.state === 400) {
      res.status(400).json({
        status: 400,
        message: '동일한 전화번호가 이미 존재합니다.',
      });
    } else if (data.state === 200) {
      res.status(200).json({
        status: 200,
        message: '수정 성공',
      });
    } else {
      next(data);
    }
  } catch (err) {
    next(err);
  }
};
exports.deleteUser = async (req, res, next) => {
  const id = req.userId;

  try {
    const data = await userService.deleteUser(id);

    res.json(data);
  } catch (err) {
    next(err);
  }
};
