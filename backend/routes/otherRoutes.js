const router = require('express').Router();

const pageNotFound = (req, res) => {
  res.status(404).send({ message: `Не корректный запрос, путь ${req.baseUrl} не существует` });
};

router.all('/*', pageNotFound);

module.exports = router;
