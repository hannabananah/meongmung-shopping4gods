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
    const createdAddress = await models.Address.create(addressData);
    return createdAddress;
  } catch (err) {
    throw new Error('등록 할 수 없습니다.' + err);
  }
};

exports.updateAddress = async (addressId, updatedData) => {
  try {
    const updatedAddress = await models.Address.findByIdAndUpdate(
      addressId,
      updatedData,
      {
        new: true,
      },
    );
    if (!updatedAddress) {
      throw new Error('해당 ID의 주소를 찾을 수 없습니다.');
    }
    return updatedAddress;
  } catch (err) {
    throw new Error('업데이트 할 수 없습니다.');
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
