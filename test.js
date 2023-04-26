const d = [{ a: 1 }];

d.push({ b: 2 });
console.log(d);

d[0].c = 3;
console.log(d)

d[0].a = 0
console.log(d)