const router = require('express').Router();
const {
  handleValidationErrors,
  cardIdParamsValidation,
  newCardValidation,
} = require('../validation/validation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.put(
  '/:cardId/likes',
  cardIdParamsValidation,
  handleValidationErrors,
  likeCard,
);

router.delete(
  '/:cardId/likes',
  cardIdParamsValidation,
  handleValidationErrors,
  dislikeCard,
);

router.delete(
  '/:cardId',
  cardIdParamsValidation,
  handleValidationErrors,
  deleteCard,
);

router.get('', getCards);

router.post(
  '',
  newCardValidation,
  handleValidationErrors,
  createCard,
);

module.exports = router;
