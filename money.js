const { getUnits, updateFile } = require("./utils");
const { loggerText, createLogger } = require("./logger");
const { withoutBalance } = require("./messagesToUser");
const data = require("./data.json");

const getTotalBalance = money => {
  return money.reduce(
    (acc, currentValue) => (acc += currentValue.value * currentValue.qt),
    0
  );
};

const verifyTransshipment = (insertedValue, totalPurchase) => {
  const transshipment = insertedValue - totalPurchase;
  return getTotalBalance(data) >= transshipment;
};

const getTransshipment = (insertedValue, totalPurchase) => {
  const transshipment = insertedValue - totalPurchase;
  return transshipment.toFixed(2);
};

const getMoney = (transshipment, cents) => {
  let arrOfCents = [];
  let sum = 0;
  const arrValues = getUnits(transshipment * 100);
  arrValues.forEach(val => {
    cents.forEach(cent => {
      const valueMult = cent.value * 100;
      if (val >= valueMult) {
        const quantity = val / valueMult;
        if (cent.qt >= quantity) {
          // console.log(`Valor de: ${val}`);
          // console.log(
          //   `Adicionando: ${quantity} moedas de ${valueMult} ao troco`
          // );
          arrOfCents.push({ qt: quantity, value: cent.value });
          sum += cent.value * quantity * 100;
          val -= sum;
          cent.qt -= quantity;
        }
        return;
      }
      return cent;
    });
  });
  // console.log(`Total da soma deu: ${sum}`);
  return { toUser: arrOfCents, toUpdateDB: cents };
};

const updateDatabaseAndRegisterLog = (
  userInput,
  totalPurchase,
  transshipment,
  options
) => {
  if (verifyTransshipment(userInput, totalPurchase)) {
    updateFile(options.data, options.fileName);
    createLogger(
      loggerText({
        type: "retirada",
        value: transshipment,
        date: new Date()
      })
    );
    return;
    // console.log("moedas a serem despejadas: ", result);
    // return result;
  }
  if (
    userInput &&
    totalPurchase &&
    !verifyTransshipment(userInput, totalPurchase)
  ) {
    createLogger(
      loggerText({
        type: withoutBalance().message,
        value: transschipment,
        date: new Date()
      })
    );
    return;
  }
};

module.exports = {
  getTotalBalance,
  getTransshipment,
  verifyTransshipment,
  getMoney,
  updateDatabaseAndRegisterLog
};
