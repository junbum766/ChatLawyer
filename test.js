const d = [{ a: 1 }];

d.push({ b: 2 });
console.log(d);

d[0].c = 3;
console.log(d);

d.pop(1);
console.log(d);
const fs = require("fs"); // json 불러오기 위함

const jsonFile = fs.readFileSync('./lawDataWithVector.json', 'utf8');
const jsonData = JSON.parse(jsonFile);

console.log(jsonData)