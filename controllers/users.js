const user = require('../models/user');

const getUsers = (req, res) => {
  user.find({})
    .then(user => res.send({ user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}
const getUser = (req, res) => {
  user.findById(req.params.userId)
    .then(user => res.send({ user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const changeUser = (req, res) => {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true
    })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const changeUserAvatar = (req, res) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true
    })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports = { getUsers, getUser, createUser, changeUser, changeUserAvatar };