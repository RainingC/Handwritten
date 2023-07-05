/**
 * call
 */
Function.prototype.myCall = function (context, ...args) {
  let cxt = context || window;
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol()
  cxt[func] = this;
  args = args ? args : []
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  //删除该方法，不然会对传入对象造成污染（添加该方法）
  delete cxt[func];
  return res;
}


/**
 * apply
 */
Function.prototype.myApply = function (context, args = []) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  let result = null;
  // 判断context是否传入，如果未传入则设置为window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = args.length > 0 ? context.fn(...args) : context.fn();
  // 删除临时属性并返回结果
  delete context.fn;
  return result;
}


/**
 * bind
 */
Function.prototype.myBind = function (context, ...args) {
  //新建一个变量赋值为this，表示当前函数
  const fn = this
  //判断有没有传参进来，若为空则赋值[]
  args = args ? args : []
  //返回一个newFn函数，在里面调用fn
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...args, ...newFnArgs])
  }
}


let name = '小王', age = 17;
let obj = {
  name: '小张',
  age: this.age,
  myFun: function (from, to) {
    console.log(this.name + ' 年龄 ' + this.age + '来自 ' + from + '去往' + to)
  }
}
let db = {
  name: '德玛',
  age: 99
}

//结果
obj.myFun.myCall(db, '成都', '上海');　　　　 // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myApply(db, ['成都', '上海']);      // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myBind(db, '成都', '上海')();       // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myBind(db, ['成都', '上海'])();　　 // 德玛 年龄 99  来自 成都, 上海去往 undefined