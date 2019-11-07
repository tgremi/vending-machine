const fs = require("fs");

const updateFile = (data, fileName) => {
  fs.writeFile(fileName, JSON.stringify(data), function(err) {
    if (err) return console.log(err);
  });
};

const getUnits = number => {
  if (number === 0) return 0;
  let arrOfUnits = [];
  let i = 1;

  while (number > 0) {
    arrOfUnits.unshift((number % 10) * i);
    number = Math.floor(number / 10);
    i *= 10;
  }

  return arrOfUnits;
};

module.exports = {
  updateFile,
  getUnits
};
