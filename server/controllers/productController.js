const productService = require('../services/productService');

exports.getAllProducts = async (req, res, next) => {
  try {
    const productList = await productService.getAllProduct();

    res.json({
      status: 200,
      productList,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    if (product === null) {
      return res
        .status(400)
        .json({ status: 400, message: '해당 상품을 찾을 수 없습니다.' });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, desc, category, img_url, price, manufacturer } = req.body;

    await productService.createProduct({
      name,
      desc,
      category,
      img_url,
      price,
      manufacturer,
    });

    res.status(200).json({
      status: 200,
      message: '상품 등록 성공',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: '서버 오류 입니다.',
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, desc, category, img_url, price, manufacturer } = req.body;

    const status = await productService.updateProduct(
      id,
      name,
      desc,
      category,
      img_url,
      price,
      manufacturer,
    );
    res.status(200).json({
      status: 200,
      message: '상품 수정 성공',
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (product === null) {
      return res
        .status(404)
        .json({ status: 404, message: '해당 상품이 존재하지 않습니다.' });
    }

    const status = await productService.deleteProduct(product);

    res.status(200).json({
      status: 200,
      message: '상품 삭제 성공',
    });
  } catch (err) {
    next(err);
  }
};
