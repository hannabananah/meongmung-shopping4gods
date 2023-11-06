const Joi = require('joi');

const orderSchema = Joi.object({
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
  // null일 수도 있으므로
  deliveryFee: Joi.number().allow(null, '').optional(),
});

module.exports = orderSchema;
