// Função generateToken pesquisada na internet.  
// FONTE: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

const generateToken = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let index = 0; index < 16; index += 1) {
    result += characters[Math.floor(Math.random() * charactersLength)];
 }
 return result;
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^\w+(\.-]?\w+)*@\w+(\.-]?\w+)*(\.\w{2,3})+$/;
  const validEmail = regex.test(email);

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res, _next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

module.exports = {
  generateToken,
  validateEmail,
  validatePassword,
};
