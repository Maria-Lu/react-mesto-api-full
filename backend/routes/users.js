const express = require('express');

const usersRoute = express.Router();
const {
  getUsers, getUserById, updateUserData, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateUserData, validateUserAvatar, validateUserId } = require('../middlewares/validation');

usersRoute.get('/', getUsers);
usersRoute.get('/me', getCurrentUser);

usersRoute.get('/:userId', validateUserId, getUserById);
usersRoute.patch('/me', validateUserData, updateUserData);
usersRoute.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = { usersRoute };
