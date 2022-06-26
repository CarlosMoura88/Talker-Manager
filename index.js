const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { generateToken, validateEmail, validatePassword } = require('./middleware/loginMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Função de leitura do arquivo que simula o banco de dados

const talkerJSON = async () => JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

// Requisito 1

app.get('/talker', async (_req, res) => {
  const allTalkers = await talkerJSON();

  if (allTalkers.length > 0) {
    res.status(HTTP_OK_STATUS).send(allTalkers);
  } else {
    res.status(HTTP_OK_STATUS).send([]);
  }
});

// Requisito 2

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;  
  const talkers = await talkerJSON();
  const talker = talkers.find((element) => element.id === Number(id));
  if (talker) {
    res.status(HTTP_OK_STATUS).send(talker);
  } else {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
});

// Requisito 3

app.post('/login', validateEmail, validatePassword, (_req, res) => {  
  const token = generateToken();  
  return res.status(HTTP_OK_STATUS).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
