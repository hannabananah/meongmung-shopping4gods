const models = require('../models');

exports.getAllAddresses = async (userId) => {
  try {
    const addresses = await models.Address.find({ userId }).exec();
    if (addresses.length === 0) {
      const err = {
        status: 400,
        message: '등록된 주소 정보가 없습니다.',
      };
      return err;
    }

    return addresses;
  } catch (err) {
    throw new Error('주소 정보를 찾을 수 없습니다.');
  }
};

exports.getAddressById = async (userId, addressId) => {
  try {
    const address = await models.Address.findOne({
      userId,
      _id: addressId,
    }).exec();

    if (!address) {
      const err = {
        status: 404,
        message: '해당 주소를 찾을 수 없습니다.',
      };
      return err;
    }

    return address;
  } catch (err) {
    throw new Error('서버 오류 입니다.');
  }
};

exports.createAddress = async (addressData) => {
  try {
    const { userId, zipCode, detailAddress, mainAddress } = addressData;

    // 이미 등록되어 있는 주소인지
    const existingAddress = await models.Address.findOne({
      zipCode,
      detailAddress,
    }).exec();

    if (existingAddress) {
      const err = {
        status: 400,
        message: '이미 등록되어 있는 주소입니다.',
      };
      return err;
    }

    // 이미 메인으로 채택되어 있는 주소가 있다면
    if (mainAddress) {
      await models.Address.updateMany(
        { userId },
        { mainAddress: false },
      ).exec();
    }

    // 주소 정보를 생성
    const createdAddress = await models.Address.create({
      ...addressData,
    });
    return createdAddress;
  } catch (err) {
    throw new Error('등록할 수 없습니다.');
  }
};

exports.updateAddress = async (addressId, updatedData) => {
  try {
    const { userId, zipCode, detailAddress, mainAddress } = updatedData;

    // 이미 등록되어 있는 주소인지
    const existingAddress = await models.Address.findOne({
      zipCode,
      detailAddress,
    }).exec();

    if (existingAddress && existingAddress._id.toString() !== addressId) {
      throw new Error('이미 등록된 주소입니다.');
    }

    // 해당 사용자의 모든 주소를 mainAddress를 false로 업데이트
    await models.Address.updateMany({ userId }, { mainAddress: false }).exec();

    // 이미 메인으로 채택되어 있는 주소가 있다면
    const mainAddressExists = await models.Address.findOne({
      userId,
      mainAddress: true,
    }).exec();

    if (mainAddressExists) {
      await models.Address.findByIdAndUpdate(mainAddressExists._id, {
        mainAddress: false,
      }).exec();
    }

    const updatedAddress = await models.Address.findByIdAndUpdate(
      addressId,
      updatedData,
      { new: true },
    );

    // 해당 addressId의 주소가 없을 경우
    if (!updatedAddress) {
      throw new Error('해당 ID의 주소를 찾을 수 없습니다.');
    }

    if (mainAddress) {
      updatedAddress.mainAddress = true;
      await updatedAddress.save();
    }

    return updatedAddress;
  } catch (err) {
    throw new Error('업데이트 할 수 없습니다.' + err);
  }
};

exports.deleteAddress = async (addressId) => {
  try {
    const deletedAddress = await models.Address.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      throw new Error('해당 ID의 주소를 찾을 수 없습니다.');
    }
    return deletedAddress;
  } catch (err) {
    throw new Error('삭제 할 수 없습니다.');
  }
};
