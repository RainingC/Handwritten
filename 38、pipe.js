// pipe中传入多个函数，会依次从左向右执行，将左面函数的执行结果作为参数传入右边一个函数中
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
