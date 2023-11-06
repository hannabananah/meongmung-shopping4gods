const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  phone: Joi.string().required(),
  name: Joi.string().required(),
});

module.exports = signupSchema;
