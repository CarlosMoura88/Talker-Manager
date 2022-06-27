const express = require('express');
const validToken = require('../middleware/validToken');
const { 
  validName, 
  validAge, 
  validTalk, 
  validWatchedAt, 
  validRate } = require('../middleware/talkersMiddlewares');

const router = express.Router();
const readTalkerJSON = require('../services/readTalkers');
const writeTalkersJSON = require('../services/writeTalkers');

router.get('/', async (_req, res) => {
  const allTalkers = await readTalkerJSON();

  if (allTalkers.length > 0) {
    res.status(200).send(allTalkers);
  } else {
    res.status(200).send([]);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;  
  const talkers = await readTalkerJSON();
  const talker = talkers.find((element) => element.id === Number(id));
  if (talker) {
    res.status(200).send(talker);
  } else {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
});

router.post('/', 
validToken, 
validName, validAge, validTalk, validWatchedAt, validRate, async (req, res) => {      
  const { name, age, talk } = req.body;
  const talkers = await readTalkerJSON();
  const id = talkers.length + 1;
  const talker = { name, age, id, talk };
  talkers.push(talker);    
  await writeTalkersJSON(talkers);

  return res.status(201).json(talker);
});

router.put('/:id',
validToken, 
validName, 
validAge, validTalk, validWatchedAt, validRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readTalkerJSON();  
  const talkerIndex = talkers.findIndex((t) => t.id === Number(id));
  talkers[talkerIndex] = {
    ...talkers[talkerIndex],
    name, 
    age,
    talk,
  };
  
  await writeTalkersJSON(talkers);

  return res.status(200).json(talkers[talkerIndex]);
});

router.delete('/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkerJSON();
  const deletedTalkers = talkers.filter((t) => t.id !== Number(id));
  await writeTalkersJSON(deletedTalkers);
  return res.status(204).json();
});

module.exports = router;