// 对象数组去重
// 1、对每个对象进行一次排序，然后都转为string来去重
// 2、双重循环，进行判断equals(obj1, obj2)
const isObjet = (val) => typeof val === "object" && val !== null;
function equals(obj1, obj2) {
    if (isObjet(obj1 && isObjet(obj2))) {
        let keys1 = Object.keys(obj1),
            keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const k of keys1) {
            if (!keys2.includes(k)) {
                return false;
            }
            return equals(keys1[k], keys2[k]);
        }
        return true;
    } else {
        return obj1 === obj2;
    }
}

// 数组扁平化 flat
//用reduce实现
function fn(arr) {
    return arr.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? fn(cur) : cur);
    }, []);
}

// 数组的push
let arr = [];
Array.prototype._push = function () {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
};

// 数组的filter方法
Array.prototype._filter = function (fn) {
    if (typeof fn !== "function") {
        throw Error("参数必须是一个函数");
    }
    const res = [];
    for (let i = 0, len = this.length; i < len; i++) {
        fn(this[i]) && res.push(this[i]);
    }
    return res;
};

// 数组的map方法
Array.prototype._map = function (fn) {
    if (typeof fn !== "function") {
        throw Error("参数必须是一个函数");
    }
    const res = [];
    for (let i = 0, len = this.length; i < len; i++) {
        res.push(fn(this[i]));
    }
    return res;
};
