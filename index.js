const {
  getTotalBalance,
  getTransshipment,
  verifyTransshipment
} = require("./money");
const { semSaldo } = require("./messagesToUser");
const { updateFile, getUnits } = require("./utils");
const { getInsertedValue, getTotalPurchase } = require("./promptCommand");
const { createLogger, loggerText } = require("./logger");
const fileName = "./data.json";
const data = require("./data.json");

const test = async (t, moedas) => {
  const moneyArr = moedas.sort((a, b) => b.value - a.value);
  try {
    const userInput = await getInsertedValue();
    const totalPurchase = await getTotalPurchase();
    const transschipment = getTransshipment(userInput, totalPurchase);
    if (
      userInput &&
      totalPurchase &&
      verifyTransshipment(userInput, totalPurchase)
    ) {
      const result = getMoney(transschipment, moneyArr);
      updateFile(data, "data.json");
      createLogger(
        loggerText({
          type: "retirada",
          value: transschipment,
          date: new Date()
        })
      );

      console.log("moedas a serem despejadas: ", result);
      return result;
    }
    if (
      userInput &&
      totalPurchase &&
      !verifyTransshipment(userInput, totalPurchase)
    ) {
      createLogger(
        loggerText({
          type: semSaldo().message,
          value: transschipment,
          date: new Date()
        })
      );
      return;
    }
  } catch (e) {
    console.error(e);
  }
};

console.log("Total em caixa: ", getTotalBalance(data).toFixed(2));
console.log(test(3.55, data).then(res => res));
