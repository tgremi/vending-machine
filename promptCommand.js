const readline = require("readline");
const fs = require("fs");
const path = require("path");


const menuOptions = () => {
  console.log("===================================");
  console.log("   1   -   Adicionar valores       ");
  console.log("   2   -   Verificar saldo         ");
  console.log("   3   -   Verificar moedas        ");
  console.log("   4   -   Verificar logs          ");
  console.log("(exit) -   Para sair               ");
  console.log("===================================");
};

const getInsertedValue = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const promise = new Promise((resolve, reject) => {
    rl.question("Qual o valor inserido?", answer => {
      if (answer) {
        resolve(answer);
        rl.close();
      }
    });
  });
  return promise;
};
const getTotalPurchase = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const promise = new Promise((resolve, reject) => {
    rl.question("Qual o total da compra? ", answer => {
      if (answer) {
        resolve(answer);
        rl.close();
      }
    });
  });
  return promise;
};

module.exports = {
  getInsertedValue,
  getTotalPurchase
};
