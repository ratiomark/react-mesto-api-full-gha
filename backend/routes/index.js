const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const otherRouter = require('./otherRoutes');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/*', otherRouter);

module.exports = {
  router,
};
