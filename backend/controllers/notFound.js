const NotFoundError = require('../errors/NotFoundError');

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
};
