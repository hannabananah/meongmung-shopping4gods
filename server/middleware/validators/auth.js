const Joi = require('joi');

exports.signup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(4)
    .message('비밀번호는 4자리 이상 입력해 주세요')
    .required(),
  phone: Joi.string()
    .regex(/^\d{3}-\d{3,4}-\d{4}$/)
    .message('올바른 전화번호를 입력해 주세요')
    .required(),
  name: Joi.string().required(),
});

exports.login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
