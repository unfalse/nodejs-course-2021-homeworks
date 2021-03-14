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

const readableStream = fs.createReadStream(csvFilePath);

const writableStream = fs.createWriteStream(txtFilePath, {
  flags: "a",
});

readableStream.on("error", (e) => {
  console.log("Error on reading file!");
  console.log(e);
});

writableStream.on("error", (e) => {
  console.log("Error on writing file!");
  console.log(e);
});

csv()
  .fromStream(readableStream)
  .subscribe(
    (jsonObj) =>
      new Promise((resolve, reject) => {
        writableStream.write(JSON.stringify(jsonObj) + "\n", "utf8", (e) => {
          if (e) {
            console.log(JSON.stringify(e));
            reject(e);
          }
        });
        resolve();
      }),
    (err) => {
      console.log("Error happened on subscribe! ", err);
    }
  );
