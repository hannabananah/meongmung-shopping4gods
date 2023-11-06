const Joi = require('joi');

exports.update = Joi.object({
  totalPrice: Joi.number().optional(),
  userId: Joi.string().optional(),
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().optional(),
        quantity: Joi.number().optional(),
      }),
    )
    .optional(),
  address: Joi.string().optional(),
  deliveryFee: Joi.number().allow(null, '').optional(),
  status: Joi.string().valid('배송전', '배송중', '배송완료').optional(),
  address: Joi.string().optional(),
});
