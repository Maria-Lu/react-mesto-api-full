const express = require('express');

const notFoundRoute = express.Router();
const { notFound } = require('../controllers/notFound');

notFoundRoute.all('/', notFound);

module.exports = { notFoundRoute };
