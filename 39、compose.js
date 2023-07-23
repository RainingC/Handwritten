//实现原理：
//1. 如果传入的 function 为空，则直接返回 参数数组
//2. 如果传入的 function 只有一个，则直接调用第一个
//3. 否则从右向左依次执行
//4. 原理为：compose中传入多个函数，会依次从右向左执行，将右面函数的执行结果作为参数传入左边一个函数中

// 方式一
function compose(...funcs) {
    let length = funcs.length;
    if (length === 0) {
        return (...args) => args;
    }
    if (length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => {
        return (...args) => {
            return a(b(...args));
        };
    });
}
// 方式二
function compose(...funcs) {
    //=>funcs:传递的函数集合
    return function proxy(...args) {
        //=>args:第一次调用函数传递的参数集合
        let len = funcs.length;
        if (len === 0) {
            //=>一个函数都不需要执行,直接返回ARGS
            return args;
        }
        if (len === 1) {
            //=>只需要执行一个函数，把函数执行，把其结果返回即可
            return funcs[0](...args);
        }
        return funcs.reduceRight((x, y) => {
            return typeof x === "function" ? y(x(...args)) : y(x);
        });
        // return funcs.reverse().reduce((x, y) => {
        //     return typeof x === "function" ? y(x(...args)) : y(x);
        // });
    };
}

// 方式三：
// 递归
function compose(...funcs) {
    if (funcs.length === 0) {
        return (...args) => args;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    let count = funcs.length - 1;
    let result = undefined;
    return function fn(...args) {
        if (count < 0) {
            return result;
        }
        result = funcs[count--](...args);
        return fn(result);
    };
}

const fn1 = (x) => x + 10;
const fn2 = (x) => x * 10;
const fn3 = (x) => x - 10;
console.log(compose(fn3, fn2, fn1)(1)); // 100
console.log(compose()(1)); // [1]
console.log(compose(fn1)(1)); // 11
