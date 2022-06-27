const fs = require('fs/promises');
// Função de escrita do arquivo que simula o banco de dados

const writeTalkersJSON = async (talker) => {   
  await fs.writeFile('./talker.json', JSON.stringify(talker));
};

module.exports = writeTalkersJSON;