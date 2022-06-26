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

const validateEmail = (email) => email;

const validatePassword = (password) => password;

module.exports = {
  generateToken,
  validateEmail,
  validatePassword,
};
