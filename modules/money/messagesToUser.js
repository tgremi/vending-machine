const withoutBalance = () => {
  console.log(
    "Sem saldo para troco, selecione outro produto ou aperte para remover seu dinheiro"
  );
  return { message: "FAILED WITHOUT BALANCE" };
};

module.exports = { withoutBalance };
