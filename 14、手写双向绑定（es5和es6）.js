// es5
let input = {};
Object.defineProperty(input, "inputValue", {
    configurable: true,
    enumerable: true,
    set: function (newVal) {
        // Model => View
        document.getElementById("foo").value = newVal;
        document.getElementById("bar").textContent = newVal;
    },
    get: function () {
        // View => Model
        return document.getElementById("foo").value;
    },
});

document.getElementById("foo").addEventListener("keyup", function (e) {
    // 仅仅是个展示问题
    // get
    document.getElementById("bar").textContent = input.inputValue;
    // 或者 set
    // input.inputValue = e.target.value
});

// es6
// target 就是第一个参数，它是否是一个具名对象其实无所谓
let inputProxy = new Proxy(
    {},
    {
        get: function (target, key, proxy) {
            console.log(target);
            return Reflect.get(target, key, proxy);
        },
        set: function (target, key, value, proxy) {
            document.getElementById("foo").value = value;
            document.getElementById("bar").textContent = value;
            return Reflect.set(target, key, value, proxy);
        },
    }
);

document.getElementById("foo").addEventListener("keyup", function (e) {
    // 显然由于 Proxy getter 这里没有绑定到视图，所以用 Proxy setter 来绑定
    inputProxy.inputValue = e.target.value;
});

// 数组双向绑定
// Object.defineProperty 不支持数组的监听，可以用 array.prototype 原型对象
var arr = [];
var push = Array.prototype.push
function upData () {
    console.log('数组更新了')
}

var arrFun = ["pop","shift","unshift","splice ","splice", 'push']

Object.defineProperty(Array.prototype, arrFun[5], {
    value: (function(){
        return function (){
            push.apply(arr, [].slice.call(arguments));
        }
    })()
});

