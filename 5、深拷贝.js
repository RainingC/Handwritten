// 深拷贝
function deepClone(obj,hash = new WeakMap()){
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    if(obj === null || typeof obj !== 'object') return obj;
    //循环引用的情况
    if(hash.has(obj)){
        return hash.get(obj)
    }
    //new 一个相应的对象
    //obj为Array，相当于new Array()
    //obj为Object，相当于new Object()
    let constr = new obj.constructor();
    hash.set(obj,constr);
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            constr[key] = deepClone(obj[key],hash)
        }
    }
    //考虑symbol的情况
    let symbolObj = Object.getOwnPropertySymbols(obj)
    for(let i=0;i<symbolObj.length;i++){
        if(obj.hasOwnProperty(symbolObj[i])){
            constr[symbolObj[i]] = deepClone(obj[symbolObj[i]],hash)
        }
    }
    return constr
}