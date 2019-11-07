const path = require("path");
const fs = require("fs");
const baseDir = path.resolve(__dirname, "./LOGS");

const createLogger = (data, options) => {
  const date = new Date();
  const fileName =
    options && options.fileName
      ? options.fileName
      : `LOGS-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }
  if (fs.existsSync(path.join(baseDir, fileName))) {
    fs.appendFile(path.resolve(baseDir, fileName), `\n ${data}`, (error) => {
      if (error) throw error;
      console.log(data)
    });
    return;
  }
  fs.writeFileSync(path.resolve(baseDir, fileName), data);
  return;
};

const loggerText = data => {
  const text = `|TYPE| ${data.type} - |VALUE| ${data.value} - |DATE| ${data.date}`;
  return text;
};

module.exports = {
  createLogger,
  loggerText
};
