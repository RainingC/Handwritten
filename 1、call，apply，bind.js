/**
 * call
 */
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
      result = null;
  // 判断context是否传入，如果未传入则设置为window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 删除临时属性并返回结果
  delete context.fn;
  return result;
}


/**
 * apply
 */
Function.prototype.myApply = function (context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数,
  let result = null;
  // 判断context是否传入，如果未传入则设置为window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  if (arguments[1]) {
    context.fn(...arguments[1]);
  } else {
    context.fn();
  }
  // 删除临时属性并返回结果
  delete context.fn;
  return result;
}


/**
 * bind
 */
Function.prototype.myBind = function (context) {
}