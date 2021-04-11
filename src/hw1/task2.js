const fs = require("fs");
const { pipeline } = require("stream");
const csv = require('csvtojson');
const byline = require('byline');

const csvFilePath = "nodejs-hw1-ex1.csv";
const txtFilePath = "nodejs-hw1-ex1.txt";

const UTF8 = 'utf8';

pipeline(
  byline.createStream(
    fs.createReadStream(csvFilePath).pipe(csv()),
  ),
  async function* (source) {
    source.setEncoding(UTF8);
    for await (const chunk of source) {
      yield `${chunk}\n`;
    }
  },
  fs.createWriteStream(txtFilePath),
  err => {
    if (err) {
      console.error('An error has happened while converting csv.', err);
    } else {
      console.log('Convert has finished successfully.');
    }
  }
);