require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middleware/cors-middleware');
const { router } = require('./routes');
const { authRouter } = require('./routes/auth');
const errorMiddleware = require('./middleware/error-middleware');
const authMiddleware = require('./middleware/auth-middleware');
const { requestLogger, errorLogger } = require('./middleware/logger-middleware');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();
app.use(express.json());
app.use(cors);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(authRouter);
app.use(authMiddleware);
app.use(router);

app.use(errorLogger);

app.use(errorMiddleware);

function start() {
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log('Сервер запущен на порту ', PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
