const express = require('express');
const {
  deleteCard, createCard, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateCardData, validateCardId } = require('../middlewares/validation');

const cardsRoute = express.Router();

cardsRoute.get('/', getCards);

cardsRoute.delete('/:cardId', validateCardId, deleteCard);
cardsRoute.post('/', validateCardData, createCard);
cardsRoute.put('/:cardId/likes', validateCardId, likeCard);
cardsRoute.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = { cardsRoute };
