const authRouter = require('express').Router();
const {
  registerValidation,
  loginValidation,
  handleValidationErrors,
} = require('../validation/validation');
const { createUser, login } = require('../controllers/users');

authRouter.post(
  '/signin',
  loginValidation,
  handleValidationErrors,
  login,
);

authRouter.post(
  '/signup',
  registerValidation,
  handleValidationErrors,
  createUser,
);

module.exports = {
  authRouter,
};
