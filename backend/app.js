require('dotenv').config();
const cors = require('./middleware/cors-middleware')
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const otherRouter = require('./routes/otherRoutes');
const {
	registerValidation,
	loginValidation,
	handleValidationErrors,
} = require('./validation/validation');
const { createUser, login } = require('./controllers/users');
const errorMiddleware = require('./middleware/error-middleware');
const authMiddleware = require('./middleware/auth-middleware');
const { requestLogger, errorLogger } = require('./middleware/logger-middleware');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);
app.use(cookieParser());

app.use(requestLogger)

app.get('/crash-test', () => {
	setTimeout(() => {
		throw new Error('Сервер сейчас упадёт');
	}, 0);
});

app.post(
	'/signin',
	loginValidation,
	handleValidationErrors,
	login,
);

app.post(
	'/signup',
	registerValidation,
	handleValidationErrors,
	createUser,
);

app.use(authMiddleware);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/*', otherRouter);

app.use(errorLogger)

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
