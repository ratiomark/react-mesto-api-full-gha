const mongoose = require('mongoose');
const { linkRegEx } = require('../validation/constants');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (value) => linkRegEx.test(value),
        message: 'Невалидная ссылка',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes:
   [{
     type: mongoose.Schema.Types.ObjectId,
     default: [],
     ref: 'user',
   }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('card', cardSchema);
