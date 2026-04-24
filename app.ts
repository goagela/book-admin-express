import { fileURLToPath } from 'node:url';
import path from 'node:path';
import createError from 'http-errors';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { User } from './model/index.js';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import bookRouter from './routes/book.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/books', bookRouter)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {

  next(createError(404));
});



app.listen('3005', () => {
  console.log('server start at 3005')
})

export default app;
