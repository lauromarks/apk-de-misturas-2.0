const C=require("../www/calc.js"), assert=require("assert");
const r=C.calcular({qtds:{5:45,8:10,18:10},mistura:"M1"});   // 45x1L + 10x0,5L + 10x0,9L = 59 L
assert.strictEqual(r.total,59); assert.strictEqual(r.aprox.MEK,47); assert.strictEqual(r.aprox["ÁLCOOL"],6);
assert.strictEqual(C.calcular({extra:10,mistura:"M1"}).exato.MEK,8);               // sem erro de ponto flutuante
const m6=C.calcular({extra:50,mistura:"M6"}); assert.strictEqual(m6.exato.METANOL,40); assert.strictEqual(m6.somaReceita,1);
assert.strictEqual(C.calcular({extra:30,mistura:"TINTA"}).aprox["TINTA BASE MEK"],30);
console.log("ok");
