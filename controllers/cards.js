/* eslint-disable no-shadow */
const card = require('../models/card');

const getCards = (req, res) => {
  card.find({})
    .populate('owner')
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Получить все карточки не удалось' }));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => next(err));
};

const deleteCard = (req, res, next) => {
  card.findByIdAndRemove(req.params.cardId, (err, resq) => {
    if (!resq) {
      next();
    }
  })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send({ card }))
    .catch((err) => next(err));
};

const dislikeCard = (req, res, next) => {
  card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send({ card }))
    .catch((err) => next(err));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
