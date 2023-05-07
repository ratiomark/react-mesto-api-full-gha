const router = require('express').Router();
const { ApiError } = require('../Errors/Errors');

const pageNotFound = (req, res, next) => {
  next(ApiError.InvalidRoute(`Не корректный запрос, путь ${req.baseUrl} не существует`));
};

router.all('/*', pageNotFound);

module.exports = router;
