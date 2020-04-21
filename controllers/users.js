/* eslint-disable no-shadow */
const user = require('../models/user');

const getUsers = (req, res) => {
  user.find({})
    .then((user) => res.send({ user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};
const getUser = (req, res, next) => {
  user.findById(req.params.userId)
    .then((user) => res.send({ user }))
    .catch((err) => {
      next(err);
    });
};
const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};
const changeUser = (req, res, next) => {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};
const changeUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports = {
  getUsers, getUser, createUser, changeUser, changeUserAvatar,
};
