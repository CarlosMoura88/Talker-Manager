const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    const response = res.status(400)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    return response; 
  }
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    const response = res
    .status(400)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    return response;
  }
  next();
};

const validTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  next();
};

const validWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  // Fonte regex: https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  const regexWatched = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const isValidWatched = regexWatched.test(watchedAt);
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });   
} 

  if (!isValidWatched) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });    
  }
  next();
};

const validRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (rate < 1 || rate > 5) {
    const response = res
    .status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    return response;
}
  next();
};

module.exports = {
  validName,
  validAge,
  validTalk,
  validWatchedAt,
  validRate,
};