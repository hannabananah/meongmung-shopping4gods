const models = require('../models');

exports.getAllProduct = async () => {
  return await models.Product.find({}).exec();
};

exports.getProductById = async (_id) => {
  return await models.Product.findOne({ _id }).exec();
};

exports.getProductByCategoryName = async (name) => {
  const products = await models.Product.find({})
    .populate({
      path: 'category',
      match: { name },
    })
    .exec();

  const filteredProducts = products.filter((product) => product.category);
  return filteredProducts;
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

exports.updateProduct = async (
  _id,
  name,
  desc,
  category,
  img_url,
  price,
  manufacturer,
) => {
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
