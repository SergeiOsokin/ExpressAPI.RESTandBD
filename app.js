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
    _id: '5e9ebb8aef68d218e0e8696d', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.status !== 500) {
    const mes = (err.name === 'ValidationError') ? `Ошибка валидаци: ${err.message}` : 'Объект не найден';
    return res.status(404).send({ message: mes });
  }
  return res.status(500).send({ message: 'Произошла ошибка на сервере' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Begin listening');
});
