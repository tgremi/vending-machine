const assert = require("assert");
const path = require("path");
const { updateFile } = require("../utils");
const {
  verifyTransshipment,
  getTotalBalance,
  getTransshipment,
  getMoney,
  updateDatabaseAndRegisterLog
} = require("../money");
const MOCK = require("./MOCK/comSaldo.json");

describe("Cliente efetuando uma compra de R$1,45 e inserindo uma nota de R$ 5,00 (maquina com salde de  R$ 3.55)", () => {
  const insertedValue = 5;
  const totalPurchase = 1.45;
  it("Calcula troco: ", () => {
    const transshipment = getTransshipment(insertedValue, totalPurchase);
    assert.equal(3.55, transshipment);
  });
  it("Verifica se existe troco para a compra: ", () => {
    const transshipment = verifyTransshipment(insertedValue, totalPurchase);
    assert.equal(true, transshipment);
  });
  it("Retorno do array com quantidade de moedas e seus valores: ", () => {
    const transshipment = getTransshipment(insertedValue, totalPurchase);
    const money = getMoney(transshipment, MOCK);
    updateDatabaseAndRegisterLog(insertedValue, totalPurchase, transshipment, {
      data: money.toUpdateDB,
      fileName: path.join(__dirname, "MOCK", "comSaldo.json")
    });
    const arrayOfCentsToReturn = [
      { qt: 3, value: 1 },
      { qt: 1, value: 0.5 },
      { qt: 1, value: 0.05 }
    ];
    assert.equal(
      JSON.stringify(arrayOfCentsToReturn),
      JSON.stringify(money.toUser)
    );
  });
  it("Verifica se foi feito update no arquivo JSON: ", () => {
    const arrayOfCentsToReturn = [
      { value: 1, qt: 11 },
      { value: 0.5, qt: 0 },
      { value: 0.25, qt: 22 },
      { value: 0.1, qt: 12 },
      { value: 0.05, qt: 11 },
      { value: 0.01, qt: 20 }
    ];

    assert.equal(JSON.stringify(arrayOfCentsToReturn), JSON.stringify(MOCK));
  });
  it("Retornando o arquivo database ao formato original: ", () => {
    // Realizando o update para voltar o arquivo ao seu formato original
    updateFile(
      [
        { value: 1, qt: 14 },
        { value: 0.5, qt: 1 },
        { value: 0.25, qt: 22 },
        { value: 0.1, qt: 12 },
        { value: 0.05, qt: 12 },
        { value: 0.01, qt: 20 }
      ],
      path.join(__dirname, "MOCK", "comSaldo.json")
    );
  });
});
