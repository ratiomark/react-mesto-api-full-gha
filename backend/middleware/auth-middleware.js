const jwt = require('jsonwebtoken');
const { ApiError } = require('../Errors/Errors');

// eslint-disable-next-line consistent-return
const authMiddleware = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return next(ApiError.Unauthorized());

		const userId = jwt.verify(token, process.env.JWT_TOKEN_SECRET || 'secret_key');
    req.userId = userId.id;
    next();
  } catch (error) {
    if (error.message === 'jwt malformed') {
      return next(ApiError.Unauthorized());
    }
    next(error);
  }
};
module.exports = authMiddleware;
