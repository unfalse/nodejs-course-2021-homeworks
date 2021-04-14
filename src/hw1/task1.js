const readline = require("readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const output = line => console.log(line.split("").reverse().join(""));

r1.on('line', output);