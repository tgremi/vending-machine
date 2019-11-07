const {
  getTotalBalance,
  getTransshipment,
  verifyTransshipment,
  getMoney
} = require("./modules/money/money");
const { withoutBalance } = require("./modules/money/messagesToUser");
const { updateFile, getUnits } = require("./helpers/utils");
const { getInsertedValue, getTotalPurchase } = require("./promptCommand");
const { createLogger, loggerText } = require("./helpers/logger");
const fileName = "./data.json";
const data = require("./data.json");

const main = async () => {
  const moneyArr = data.sort((a, b) => b.value - a.value);
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
      console.log("moedas a serem despejadas: ", result.toUser);
      return result;
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
  } catch (e) {
    console.error(e);
  }
};

main();
