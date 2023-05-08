/* eslint-disable no-case-declarations */
const User = require('../models/users');
const { ApiError } = require('../Errors/Errors');

const findUserById = async (req) => {
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) throw ApiError.NotFound();
  return user;
};

const updateUser = async (req, updateType = 'main') => {
  let data;
  let userId;
  // eslint-disable-next-line default-case
  switch (updateType) {
    case 'main':
      const { name, about } = req.body;
      userId = req.userId;
      data = await User.findByIdAndUpdate(
        userId,
        { name, about },
        { new: true, runValidators: true },
      );
      break;
    case 'avatar':
      const { avatar } = req.body;
      userId = req.userId;
      data = await User.findByIdAndUpdate(
        userId,
        { avatar },
        { new: true, runValidators: true },
      );
      break;
  }
  if (!data) throw ApiError.BadRequest();
  return data;
};

module.exports = { updateUser, findUserById };
