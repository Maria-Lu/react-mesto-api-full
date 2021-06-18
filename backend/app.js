require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const { errors } = require('celebrate');
const { usersRoute } = require('./routes/users');
const { cardsRoute } = require('./routes/cards');
const { notFoundRoute } = require('./routes/notFound');
const { login, createUser, signOut } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateSignUp, validateSignIn } = require('./middlewares/validation');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({
  origin: 'https://mesto.russia.nomoredomains.club',
  credentials: true,
}));

app.use(cookieParser());

app.use(express.json());

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);
app.get('/signout', signOut);

app.use('/users', auth, usersRoute);
app.use('/cards', auth, cardsRoute);
app.use('*', notFoundRoute);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line
});
