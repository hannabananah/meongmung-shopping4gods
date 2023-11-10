const models = require('../models');

exports.getAllAddresses = async (userId) => {
  const addresses = await models.Address.find({ userId }).exec();
  if (!addresses) {
    throw new Error('주소 정보를 찾을 수 없습니다.');
  }
  return addresses;
};

exports.getAddressById = async (_id) => {
  try {
    const address = await models.Address.findOne({
      _id,
    }).exec();

    if (!address) {
      throw new Error('주소 정보를 찾을 수 없습니다.');
    }

    return address;
  } catch (err) {
    throw new Error(err);
  }
};

exports.createAddress = async ({
  userId,
  name,
  zipCode,
  detailAddress,
  phone,
  mainAddress,
}) => {
  // 이미 등록되어 있는 주소인지
  const existingAddress = await models.Address.findOne({
    zipCode,
    detailAddress,
  }).exec();

  if (existingAddress) {
    throw new Error('이미 등록되어 있는 주소 입니다.');
  }

  try {
    // 주소 정보를 생성
    const createdAddress = await models.Address.create({
      userId,
      name,
      zipCode,
      detailAddress,
      phone,
      mainAddress,
    });
    return createdAddress;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateAddress = async (updatedData) => {
  try {
    const {
      id: _id,
      userId,
      name,
      zipCode,
      detailAddress,
      phone,
      mainAddress,
    } = updatedData;

    if (mainAddress) {
      // 모든 주소의 madinAddress를 false로 설정
      await models.Address.updateMany(
        { userId },
        { mainAddress: false },
      ).exec();
    }

    const updatedAddress = await models.Address.findByIdAndUpdate(
      _id,
      { $set: updatedData },
      { new: true },
    );

    return updatedAddress;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteAddress = async (addressId) => {
  try {
    const deletedAddress = await models.Address.findByIdAndDelete(addressId);

    if (!deletedAddress) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    return deletedAddress;
  } catch (err) {
    throw new Error(err);
  }
};
