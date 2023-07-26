//从reactive起步开始看

class Dep {
  //将所有用到这个东西的收集到数组里，每一个数据对应一个dep
  constructor() {
    //用set这样的话订阅者就不会重复
    this.subscribers = new Set()
  }
  //收集订阅者
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }
  //执行订阅者的函数
  notify() {
    this.subscribers.forEach((effect) => {
      effect()
    })
  }
}

let activeEffect = null
//定义这个就不用去手动去添加了，我定义依赖的时候我就通过这个来把他的依赖收集起来
const watchEffect = (effect) => {
  //在这里activeeffect = effect 这样调用一下effect就执行了get，就收集了依赖
  activeEffect = effect
  effect()
  activeEffect = null
}

// 设置代理对象对数据进行劫持，对每一个数据都new一个dep，这样他的依赖就完全是依赖他了，他改变就全部执行它的依赖就可以了
//Map的key是字符串
//WeakMap的key是一个对象，并且是弱引用的，如果这个对象你把它设置为空，那么weakMap中的这个值也就没了
const targetMap = new WeakMap()
//这个方法的意思应该是所有的响应式对象都保存在weakmap中，这样的话通过这个对象先拿到他的真正的值，然后再去拿最终的属性对应的dep
const getDep = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    //这里为什么是map，因为key不会重复
    //去出Map对象
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}
const reactive = (raw) => {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key)
      dep.depend()
      return target[key]
    },
    set(target, key, newValue) {
      const dep = getDep(target, key)
      target[key] = newValue
      dep.notify()
    }
  })
}

//测试代码
const info = reactive({ counter: 100, name: '曹芮宁' })
const foo = reactive({ age: 18 })

//这两个函数由依赖，好，我给他收集起来
watchEffect(() => {
  console.log(info.counter, info.name)
})

watchEffect(() => {
  console.log(foo.age)
})

watchEffect(() => {
  console.log(info.counter * 2)
})

watchEffect(() => {
  console.log(info.counter * info.counter)
})

info.counter++
info.name = 'coder'
