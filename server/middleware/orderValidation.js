const Joi = require('joi');

const order = Joi.object({
  totalPrice: Joi.number().required(),
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().required(),
      }),
    )
    .required(),
  shippingAddress: Joi.string().required(),
  // null일 수도 있으므로
  deliveryFee: Joi.number().allow(null, '').optional(),
});

function orderValidation(req, res, next) {
  const { error } = order.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = orderValidation;
