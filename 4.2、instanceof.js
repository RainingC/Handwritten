function myInstanceOf (a, b) {
    if ((typeof a !== "object" && typeof a !== "function") || a === null) return false;
    let left = a.__proto__,
        right = b.prototype;
    while (true) {
        if (left === null) {
            return false;
        }
        if (left === right) {
            return true;
        }
        left = left.__proto__;
    }
}

function aaa () {
    // ....
}

console.log(myInstanceOf(aaa, Function));
console.log(Function.prototype === Function.__proto__);