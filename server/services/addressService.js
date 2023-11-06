const models = require('../models');

exports.getAllAddresses = async (userId) => {
  const addresses = await models.Address.find({ userId }).exec();
  if (!addresses) {
    throw new Error('주소 정보를 찾을 수 없습니다.');
  }
  return addresses;
};

exports.getAddressById = async (userId, addressId) => {
  const address = await models.Address.findOne({
    userId,
    _id: addressId,
  }).exec();
  if (!address) {
    throw new Error('주소 정보를 찾을 수 없습니다.');
  }
  return address;
};

exports.createAddress = async (addressData) => {
  const { userId, zipCode, detailAddress, mainAddress } = addressData;

  // 이미 등록되어 있는 주소인지
  const existingAddress = await models.Address.findOne({
    zipCode,
    detailAddress,
  }).exec();

  if (existingAddress) {
    const err = {
      status: 400,
      message: '이미 등록된 주소입니다.',
    };
    return err;
  }

  // 이미 메인으로 채택되어 있는 주소가 있다면
  if (mainAddress) {
    await models.Address.updateMany({ userId }, { mainAddress: false }).exec();
  }

  // 주소 정보를 생성
  const createdAddress = await models.Address.create({
    ...addressData,
  });
  return createdAddress;
};

exports.updateAddress = async (addressId, updatedData) => {
  const { userId, zipCode, detailAddress, mainAddress } = updatedData;

  // 이미 등록되어 있는 주소인지
  const existingAddress = await models.Address.findOne({
    zipCode,
    detailAddress,
    _id: { $ne: addressId },
  }).exec();

  if (existingAddress && existingAddress._id.toString() !== addressId) {
    const err = {
      status: 400,
      message: '이미 등록된 주소입니다.',
    };
    return err;
  }

  if (mainAddress) {
    await models.Address.updateMany(
      { userId, _id: { $ne: addressId } },
      { mainAddress: false },
    ).exec();
  }

  const updatedAddress = await models.Address.findByIdAndUpdate(
    addressId,
    updatedData,
    { new: true },
  );
  return updatedAddress;
};

exports.deleteAddress = async (addressId) => {
  const deletedAddress = await models.Address.findByIdAndDelete(addressId);
  if (!deletedAddress) {
    const err = {
      status: 404,
      message: '해당 ID의 주소를 찾을 수 없습니다.',
    };
    return err;
  }
  return deletedAddress;
};
