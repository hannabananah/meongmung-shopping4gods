const Joi = require('joi');

const order = Joi.object({
  totalPrice: Joi.number().required(),
  // null일 수도 있으므로
  deliveryFee: Joi.number().allow(null),
  status: Joi.string().valid('배송전', '배송중', '배송완료').required(),
});

function orderValidation(req, res, next) {
  const { error } = order.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = orderValidation;
