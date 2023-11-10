const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  img_url: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().required(),
  summary: Joi.string().optional(),
  discount: Joi.boolean().optional(),
  isNewArrival: Joi.boolean().optional(),
  manufacturer: Joi.string().required(),
  recommendDogAge: Joi.object({
    min: Joi.number().optional(),
    max: Joi.number().optional(),
  }).optional(),
  recommendDogSize: Joi.array()
    .items(
      Joi.string().valid('초소형견', '소형견', '중형견', '대형견', '초대형견'),
    )
    .optional(),
});

exports.update = Joi.object({
  name: Joi.string().optional(),
  category: Joi.string().optional(),
  img_url: Joi.string().optional(),
  desc: Joi.string().optional(),
  price: Joi.number().optional(),
  summary: Joi.string().optional(),
  discount: Joi.boolean().optional(),
  isNewArrival: Joi.boolean().optional(),
  manufacturer: Joi.string().optional(),
  recommendDogAge: Joi.object({
    min: Joi.number().optional(),
    max: Joi.number().optional(),
  }).optional(),
  recommendDogSize: Joi.array()
    .items(
      Joi.string().valid('초소형견', '소형견', '중형견', '대형견', '초대형견'),
    )
    .optional(),
});
