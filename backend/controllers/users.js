const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const { ApiError } = require('../Errors/Errors');
const { updateUser, findUserById } = require('../utils/updateUser');

const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password: userPassword,
    } = req.body;

    const passwordHash = await bcrypt.hash(userPassword, 7);
    const data = await User.create({
      name, about, avatar, password: passwordHash, email,
    });

    const { password, ...otherData } = data._doc;
    res.status(200).json({ data: { ...otherData } });
  } catch (error) {
    if (error.code === 11000) {
      next(ApiError.Conflict());
      return;
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) throw ApiError.Unauthorized();

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw ApiError.Unauthorized();

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_TOKEN_SECRET || 'secret_key',
      { expiresIn: '7d' },
    );
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const data = await User.find({});
    res.send({ data });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await User.findById(userId);

    if (!data) throw ApiError.NotFound();
    res.send({ data });
  } catch (error) {
    next(error);
  }
};

const getUserData = async (req, res, next) => {
  try {
    const user = await findUserById(req);
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const data = await updateUser(req, 'main');
    res.send({ data });
  } catch (error) {
    next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const data = await updateUser(req, 'avatar');
    res.send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getUserData,
};
