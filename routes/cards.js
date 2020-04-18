/* eslint-disable no-console */
const routerCards = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

routerCards.get('/', getCards);

routerCards.post('/', createCard);

routerCards.delete('/:cardId', deleteCard);

routerCards.put('/:cardId/likes', likeCard);

routerCards.delete('/:cardId/likes', dislikeCard);

module.exports = routerCards;
//5e99c8fa1af5c72ca4b70234  5e99c9011af5c72ca4b70235 5e99c9081af5c72ca4b70236