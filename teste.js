const rand = () => Math.random().toString(36).substr(2);

const token = () => rand();

const teste = token();
  
console.log(teste.length);