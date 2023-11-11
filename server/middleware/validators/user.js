const Joi = require('joi');

exports.createUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  phone: Joi.string()
    .regex(/^\d{3}-\d{3,4}-\d{4}$/)
    .required(),
  name: Joi.string().required(),
});

exports.updateUser = Joi.object({
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .regex(/^\d{3}-\d{3,4}-\d{4}$/)
    .optional(),
  name: Joi.string().optional(),
});
