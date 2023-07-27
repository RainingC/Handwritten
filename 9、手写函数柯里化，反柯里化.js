function curry(fn, ...args) {
    let fnLen = fn.length,
        argsLen = args.length;
    //对比函数的参数和当前传入参数
    //若参数不够就继续递归返回curry
    //若参数够就调用函数返回相应的值
    if (fnLen > argsLen) {
        return function (...args1) {
            return curry(fn, ...args, ...args1);
        }
    } else {
        return fn(...args);
    }
}

// function sumFn(a, b, c) {
//     console.log(a + b + c);
//     // return a+ b + c
// };
// let sum = curry(sumFn);
// sum(2)(3)(5)//10
// sum(2, 3)(5)//10


// 反柯里化
function unCurrying(fn) {
    return function (tar, ...args) {
        return fn.apply(tar, ...args);
    }
}

Function.prototype.unCurrying = function () {
    const self = this
    return function (...rest) {
        return Function.prototype.call.apply(self, rest)
    }
}


// // 测试
// const push = unCurrying(Array.prototype.push)

// ~function (...rest) {       // rest:[1,2,3]
//     push(rest, 4)
//     console.log(rest)    // [1, 2, 3, 4]
// }(1, 2, 3)