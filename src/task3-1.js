import readline from 'readline';

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

r1.on('line', cmd => void console.log(cmd.split('').reverse().join('')));