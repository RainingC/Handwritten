function myObjCreate (Obj, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object: ' + proto);
    } else if (proto === null) {
        throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
    }

    if (typeof propertiesObject !== 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
    // 上面这些可以省略，主要是下面这三行
    // 新声明一个函数
    function C(){};
    // 将函数的原型指向obj
    C.prototype = Obj;
    // 返回这个函数的实力化对象
    return new C()
}