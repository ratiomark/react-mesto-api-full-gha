// Использовал express-validator вместо joi, тесты все проходит, валидирует как нужно
const { body, param, validationResult } = require('express-validator');
const isValidObjectId = require('mongoose').mongoose.Types.ObjectId.isValid;
const { ApiError } = require('../Errors/Errors');

const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Слишком короткий пароль').isLength({ min: 3 }),
  body('avatar').optional().isURL(),
  body('name').optional().isLength({ min: 2, max: 30 }),
  body('about').optional().isLength({ min: 2, max: 30 }),
];

const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Слишком короткий пароль').isLength({ min: 3 }),
];

const avatarValidation = [
  body('avatar').isURL(),
];

const patchUserDataValidation = [
  body('name').isLength({ min: 2, max: 30 }),
  body('about').isLength({ min: 2, max: 30 }),
];

const newCardValidation = [
  body('link').isURL(),
  body('name').isLength({ min: 2, max: 30 }),
];

const userIdParamsValidation = [
  param('userId').custom((value) => {
    if (!isValidObjectId(value)) throw ApiError.BadRequest();
    return true;
  }),
];

const cardIdParamsValidation = [
  param('cardId').custom((value) => {
    if (!isValidObjectId(value)) throw ApiError.BadRequest();
    return true;
  }),
];

// eslint-disable-next-line consistent-return
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(ApiError.BadRequest());
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  handleValidationErrors,
  patchUserDataValidation,
  avatarValidation,
  userIdParamsValidation,
  cardIdParamsValidation,
  newCardValidation,
};
