const Joi = require('joi');

exports.signup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  phone: Joi.string().required(),
  name: Joi.string().required(),
});

exports.login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
