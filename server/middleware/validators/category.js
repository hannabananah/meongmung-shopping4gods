const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().required(),
});

exports.update = Joi.object({
  name: Joi.string().optional(),
});
