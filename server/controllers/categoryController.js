const categoryService = require('../services/categoryService');

exports.getAllCategory = async (req, res, next) => {
  const { name } = req.query;

  try {
    const list = await categoryService.getAllCategories(name);
    res.status(200).json({ status: 200, message: list });
  } catch (err) {
    next(err);
  }
};

exports.getCategoryByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    const categoryName = await categoryService.getCategoryByName(name);

    // 없으면 다른 값을 전달해준다.
    if (categoryName === null) {
      return res.json({
        status: 404,
        message: `해당 카테고리를 찾을 수 없습니다. (${name})`,
      });
    }

    res.json({ status: 200, message: `${categoryName}을 찾았습니다.` });
  } catch (err) {
    next(err);
  }
};

exports.getProductByCategoryName = async (req, res, next) => {
  try {
    const { name } = req.params;

    const product = await categoryService.getProductByCategoryName(name);
    res.status(200).json({ products: product });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const data = await categoryService.createCategory({ name });

    res.status(201).json({ status: 201, message: data });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await categoryService.updateCategory(id, name);
    res.json({ status: 200, message: '카테고리 수정 성공' });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const categoryName = await categoryService.deleteCategory(id);

    res.json({
      status: 200,
      message: `${categoryName} 이(가) 성공적으로 삭제 되었습니다.`,
    });
  } catch (err) {
    next(err);
  }
};
