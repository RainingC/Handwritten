function Ctor(){
    // ...
}

function myNew (ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw new Error('myNew function first argument must be a function')
    }
    let newObj = Object.create(ctor.prototype); //创建一个继承自ctor.prototype的新对象
    let ctorReturnResult = ctor.apply(newObj, args); //将构造函数ctor的this绑定到newObj中
    let isObject = typeof ctorReturnResult === 'object' && typeof ctorReturnResult !== null;
    let isFunction = typeof ctorReturnResult === 'function';
    if (isObject || isFunction) {
        return ctorReturnResult;
    }
    return newObj;
}

// let c = myNew(Ctor);

// console.log(c)
// console.log(c.__proto__ === Ctor.prototype);
// console.log(c.__proto__.constructor === Ctor);

// console.log(Ctor.prototype);
// console.log(Ctor.__proto__ === Function.prototype);
// console.log(Ctor.__proto__.constructor === Function);
// console.log(Ctor instanceof Function);

console.log(Function.prototype);
console.log(Function.__proto__);
console.log(Function.__proto__ === Function.prototype);
console.log(Function instanceof Object);