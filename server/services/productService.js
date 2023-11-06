const models = require('../models');

exports.getAllProduct = async () => {
  return await models.Product.find({}).exec();
};

exports.getProductById = async (_id) => {
  return await models.Product.findOne({ _id }).exec();
};

exports.createProduct = async ({
  name,
  desc,
  category,
  img_url,
  price,
  manufacturer,
}) => {
  const product = await models.Product.create({
    name,
    desc,
    category,
    img_url,
    price,
    manufacturer,
  });
  return product;
};

exports.updateProduct = async (product) => {
  try {
    const {
      id: _id,
      name,
      desc,
      category,
      img_url,
      price,
      summary,
      discount,
      isNewArrival,
      manufacturer,
    } = product;
    const data = await models.Product.updateOne(
      { _id },
      {
        name,
        desc,
        category,
        img_url,
        price,
        summary,
        discount,
        isNewArrival,
        manufacturer,
      },
    ).exec();

    if (!data.acknowledged) {
      return { state: 200, message: '수정 실패' };
    }
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteProduct = async (_id) => {
  return await models.Product.deleteOne({ _id }).exec();
};
