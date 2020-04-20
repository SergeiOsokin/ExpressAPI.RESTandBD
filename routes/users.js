/* eslint-disable no-console */
const routerUsers = require('express').Router();
const {
  getUsers, getUser, createUser, changeUser, changeUserAvatar,
} = require('../controllers/users');

routerUsers.get('/', getUsers);

routerUsers.get('/:userId', getUser);

routerUsers.post('/', createUser);

routerUsers.patch('/me', changeUser);

routerUsers.patch('/me/avatar', changeUserAvatar);

module.exports = routerUsers;
