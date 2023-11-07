const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().required(),
  size: Joi.string()
    .valid('초소형견', '소형견', '중형견', '대형견', '초대형견')
    .required(),
  age: Joi.number().required(),
});

exports.update = Joi.object({
  name: Joi.string().optional(),
  size: Joi.string()
    .valid('초소형견', '소형견', '중형견', '대형견', '초대형견')
    .optional(),
  age: Joi.number().optional(),
});
