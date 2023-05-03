const Card = require('../models/cards');

const { ApiError } = require('../Errors/Errors');

const getCards = async (req, res, next) => {
  try {
    const data = await Card.find({}).populate(['likes', 'owner']);
    res.send({ data });
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const { userId } = req;

    const data = await Card.create({ name, link, owner: userId });
    res.send({ data });
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const { userId } = req;
    const card = await Card.findById(cardId);

    if (!card) throw ApiError.NotFound();
    if (userId !== card.owner.toString()) throw ApiError.Forbidden();

    const data = await Card.findByIdAndDelete({ _id: cardId });

    res.send({ data });
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const { userId } = req;
    const data = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).populate('likes');

    if (!data) throw ApiError.NotFound();
    res.send({ data });
  } catch (err) {
    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const { userId } = req;
    const data = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).populate('likes');

    if (!data) throw ApiError.NotFound();
    res.send({ data });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
};
