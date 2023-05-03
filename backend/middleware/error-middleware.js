const { ApiError } = require('../Errors/Errors');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message });
  }

  return res.status(500)
    .json({
      message: 'Что-то пошло не так',
      errorMessage: err.message,
    });
};
