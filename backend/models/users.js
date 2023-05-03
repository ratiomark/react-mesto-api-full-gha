const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { linkRegEx } = require('../validation/constants');

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: 'Неправильный формат почты',
      },
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      trim: true,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
      trim: true,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      trim: true,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (value) => linkRegEx.test(value),
        message: 'This is not a valid link!',
      },
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('user', userSchema);
