const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().required(),
  zipCode: Joi.string().length(5).required(),
  detailAddress: Joi.string().required(),
  detail: Joi.string().required(),
  recipient: Joi.string().required(),
  phone: Joi.string()
    .regex(/^\d{3}-\d{3,4}-\d{4}$/)
    .required(),
  mainAddress: Joi.boolean().optional(),
});

exports.update = Joi.object({
  name: Joi.string().optional(),
  zipCode: Joi.string().length(5).optional(),
  detailAddress: Joi.string().optional(),
  detail: Joi.string().optional(),
  recipient: Joi.string().optional(),
  phone: Joi.string()
    .regex(/^\d{3}-\d{3,4}-\d{4}$/)
    .optional(),
  mainAddress: Joi.boolean().optional(),
});
