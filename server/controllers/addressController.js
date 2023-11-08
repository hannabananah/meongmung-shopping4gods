const addressService = require('../services/addressService');

exports.getAllAddresses = async (req, res, next) => {
  const userId = req.userId;
  try {
    const addresses = await addressService.getAllAddresses(userId);
    res.json({ status: 200, addresses });
  } catch (err) {
    next(err);
  }
};

exports.getAddressById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const address = await addressService.getAddressById(id);

    res.status(200).json({
      status: 200,
      address,
    });
  } catch (err) {
    next(err);
  }
};

exports.createAddress = async (req, res, next) => {
  const userId = req.userId;
  const { name, zipCode, detailAddress, phone, mainAddress } = req.body;

  try {
    const address = await addressService.createAddress({
      userId,
      name,
      zipCode,
      detailAddress,
      phone,
      mainAddress,
    });

    res.status(200).json({
      status: 200,
      message: '등록 성공',
      address,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAddress = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId;
  const { name, zipCode, detailAddress, phone, mainAddress } = req.body;

  try {
    await addressService.updateAddress({
      id,
      userId,
      name,
      zipCode,
      detailAddress,
      phone,
      mainAddress,
    });
    res.json({
      status: 200,
      message: '수정 성공',
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAddress = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedAddress = await addressService.deleteAddress(id);
    if (deletedAddress) {
      res.json({
        status: 200,
        message: '삭제 성공',
      });
    } else {
      res.status(404).json({
        status: 404,
        message: '해당 주소를 찾을 수 없습니다.',
      });
    }
  } catch (err) {
    next(err);
  }
};
