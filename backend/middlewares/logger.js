const winston = require('winston');
const expressWinston = require('express-winston');

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'logs/request.log' }),
  ],
  format: winston.format.json(),
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
  format: winston.format.json(),
});
