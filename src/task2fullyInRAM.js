const csv = require("csvtojson");
const csvFilePath = "nodejs-hw1-ex1.csv";
const txtFilePath = "nodejs-hw1-ex1.txt";
const fs = require("fs");

fs.truncate(txtFilePath, 0, (e) => {
  if (e) {
    console.log("Error on truncating file!");
    console.log(e);
  }
});

const writableStream = fs.createWriteStream(txtFilePath, {
  flags: "a",
});

writableStream.on("error", (e) => {
  console.log("Error on writing file!");
  console.log(e);
});

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    jsonObj.forEach(line => {
      writableStream.write(JSON.stringify(line) + "\n", "utf8", (e) => {
        if (e) {
          console.log(JSON.stringify(e));
        }
      });
    });
  })
  .catch((err) => {
    console.log("Error happened on convert! ", err);
  });
