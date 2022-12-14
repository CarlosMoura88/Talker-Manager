const express = require('express');
const bodyParser = require('body-parser');
const { generateToken, validateEmail, validatePassword } = require('./middleware/loginMiddleware');
const talkersRouter = require('./routers/talkersRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use('/talker', talkersRouter);

app.post('/login', validateEmail, validatePassword, generateToken);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
