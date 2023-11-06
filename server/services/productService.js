const models = require('../models');

exports.getAllProduct = async (page, perPage) => {
  try {
    const totalProducts = await models.Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);
    const products = await models.Product.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    return {
      products,
      page,
      totalPages,
    };
  } catch (error) {
    throw new Error('상품을 가져올 수 없습니다.');
  }
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

exports.updateProduct = async ({
  _id,
  name,
  desc,
  category,
  img_url,
  price,
  manufacturer,
}) => {
  try {
    const data = await models.Product.updateOne(
      { _id },
      { name, desc, category, img_url, price, manufacturer },
    ).exec();
    if (!data.acknowledged) {
      return { state: 200, message: '수정 실패' };
    }
    return { state: 200, massage: '수정 성공' };
  } catch (err) {
    throw new Error('업데이트 할 수 없습니다.');
  }
};

exports.deleteProduct = async (_id) => {
  return await models.Product.deleteOne({ _id }).exec();
};
