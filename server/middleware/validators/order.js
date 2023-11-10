const Joi = require('joi');

exports.create = Joi.object({
  totalPrice: Joi.number().required(),
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().required(),
      }),
    )
    .required(),
  address: Joi.string().required(),
  deliveryFee: Joi.number().allow(null, '').optional(),
});

exports.update = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().optional(),
        quantity: Joi.number().optional(),
      }),
    )
    .optional(),
  address: Joi.string().optional(),
});
