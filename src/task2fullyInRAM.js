const csv = require("csvtojson");
const csvFilePath = "nodejs-hw1-ex1.csv";
const txtFilePath = "nodejs-hw1-ex1.txt";
const fs = require("fs");

const UTF8 = 'utf8';

fs.truncate(txtFilePath, 0, err => {
  if (err) {
    console.error(err);
  }
});

const flags = 'a';
const writableStream = fs.createWriteStream(txtFilePath, {
  flags
});

writableStream.on("error", err => {
  console.error(err);
});

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    jsonObj.forEach(line => {
      writableStream.write(JSON.stringify(line) + "\n", UTF8, err => {
        if (err) {
          console.error(JSON.stringify(err));
        }
      });
    });
  })
  .catch(console.error);
