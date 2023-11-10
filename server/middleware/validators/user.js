const Joi = require('joi');

exports.createUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  phone: Joi.number().required(),
  name: Joi.string().required(),
});

exports.updateUser = Joi.object({
  email: Joi.string().email().optional(),
  phone: Joi.number().optional(),
  name: Joi.string().optional(),
});
