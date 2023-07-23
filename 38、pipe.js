function pipe(...fns) {
    return function (v) {
        return fns.reduce((acc, cur) => cur(acc), v);
    };
}
// test
const add = (x) => x + 1;
const minus = (x) => x - 2;
const squared = (x) => x ** 2;
const res = pipe(add, minus, squared)(4);
console.log(res);
