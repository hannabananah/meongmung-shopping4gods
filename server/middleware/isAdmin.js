const jwt = require('jsonwebtoken');
const config = require('../config');

exports.isAdmin = async function (req, res, next) {
  const header = req.get('Authorization');
  console.log(header);
  if (!(header && header.startsWith('Bearer'))) {
    return res.status(401).json({ message: 'Authorization 오류 입니다.' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secretKey);

    if (!decoded.isAdmin) {
      return res
        .status(401)
        .json({ status: 401, message: '당신은 접근 권한이 없습니다.' });
    }

    next();
  } catch (err) {
    if (err.message.includes('expired')) next('토큰 기한이 만료 되었습니다.');
    else if (err.message.includes('invalid')) next('유효한 토큰이 아닙니다.');
    else next(err);
  }
};
