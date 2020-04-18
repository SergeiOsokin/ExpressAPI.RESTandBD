const card = require('../models/card');

const getCards = (req, res) => {
  card.find({})
    .populate('owner')
    .then(card => res.send({ card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  card.findByIdAndDelete(req.params.cardId)
    .then(card => res.send({ card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const likeCard = (req, res) => {
  card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const dislikeCard = (req, res) => {
  card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };