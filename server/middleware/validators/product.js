const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().email().required(),
  category: Joi.string().required(),
  img_url: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().required(),
  summary: Joi.boolean().optional(),
  discount: Joi.boolean().optional(),
  isNewArrival: Joi.boolean().optional(),
  manufacturer: Joi.string().required(),
  dogAge: Joi.number().optional(),
  dogSize: Joi.string().optional(),
});

exports.update = Joi.object({
  name: Joi.string().email().optional(),
  category: Joi.string().optional(),
  img_url: Joi.string().optional(),
  desc: Joi.string().optional(),
  price: Joi.number().optional(),
  summary: Joi.boolean().optional(),
  discount: Joi.boolean().optional(),
  isNewArrival: Joi.boolean().optional(),
  manufacturer: Joi.string().optional(),
  dogAge: Joi.number().optional(),
  dogSize: Joi.string().optional(),
});
