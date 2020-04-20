/* eslint-disable spaced-comment */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5e98b9b2943ebe19608aed5a', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use((err, req, res, next) => {
  if (err.status != 500) {
    res.status(404).send({ message: (err.name == 'ValidationError') ?  'Ошибка валидаци': 'Объект не найден'});
  }
  res.status(500).send({ message: 'Произошла ошибка на сервере' })
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Begin listening');
});
