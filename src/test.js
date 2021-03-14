const fs = require('fs');
const path = require('path');


let file = __dirname + `/../characterSets/character_set.txt`

let data = fs.readFileSync(file, 'utf8');

console.log(data);
console.log(file);
let file2 = process.cwd() + `/characterSets/character_set.txt`;
console.log(file2);

let data2 = fs.readFileSync(file2, 'utf-8');

console.log(data2);

console.log(process.cwd);

// let test3 = path.resolve(__dirname, 'characterSets', 'character_set.txt');
// console.log(test3);

