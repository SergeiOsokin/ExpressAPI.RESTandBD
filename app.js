/* eslint-disable spaced-comment */
const express = require('express');
const path = require('path');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5e98b9b2943ebe19608aed5a' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Begin listening');
});
//5e98bcc95984572124bd5cbc