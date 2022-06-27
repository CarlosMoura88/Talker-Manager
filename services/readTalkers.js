const fs = require('fs');
// Função de escrita do arquivo que simula o banco de dados

const readTalkerJSON = async () => JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

module.exports = readTalkerJSON;