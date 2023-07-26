//1、用于调用生成一个dom树
const h = (tag, props, children) => {
  return {
    tag,
    props,
    children
  }
}
// 2、拿到vnode挂载到app上
const mount = (vnode, container) => {
  // vnode -> element
  // 1、创建真实元素并且再vnode上保存一份
  const el = (vnode.el = document.createElement(vnode.tag))
  //2、处理props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key]
      //对事件监听的判断
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }
  //3、处理children
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach((item) => {
        mount(item, el)
      })
    }
  }
  //将el挂载到container上
  container.appendChild(el)
}
// 3、新旧node对比，更新dom
const patch = (n1, n2) => {
  //1、如果这两个标签名都不一样了，直接全部替换
  if (n1.tag !== n2.tag) {
    const n1Parent = n1.el.parentElement
    n1Parent.removeChild(n1.el)
    mount(n2, n1Parent)
  } else {
    //将n1和n2的el保存为相同的
    const el = (n2.el = n1.el)
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    //2、判断props是否相同
    // 2、1将新props添加到el上
    for (const key in newProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if (oldValue !== newValue) {
        if (key.startsWith('on')) {
          el.addEventListener(key.slice(2).toLowerCase(), newValue)
        } else {
          el.setAttribute(key, newValue)
        }
      }
    }
    // 2、2 删除旧的props
    for (const key in oldProps) {
      if (key.startsWith('on')) {
        const value = oldProps[key]
        el.removeEventListener(key.slice(2).toLowerCase(), value)
      }
      if (!(key in newProps)) {
        el.removeAttribute(key)
      }
    }

    //3、判断children
    const oldChildren = n1.children || []
    const newChildren = n2.children || []
    //情况一，newchildren本身是一个字符串
    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string' && newChildren !== oldChildren) {
        el.textContent = newChildren
      } else {
        el.innerHTML = newChildren
      }
    } else {
      //情况二newchildren是一个数组
      if (typeof oldChildren === 'string') {
        el.innerHTML = ''
        newChildren.forEach((item) => {
          mount(item, el)
        })
      } else {
        //情况三new和old都是数组 old [v1,v2,v5] new [v3,v4,v6,v7],如果旧的长，那么剩下的就移除，如果新的长剩下的都添加
        const commonLength = Math.min(oldChildren.length, newChildren.length)
        //前面共同长度的部分进行patch操作
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i])
        }
        //多余的部分进行添加或删除
        //多余部分进行添加
        if (newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach((item) => {
            mount(item, el)
          })
        }
        //旧节点多进行移除操作
        if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach((item) => {
            el.removeChild(item.el)
          })
        }
      }
    }
  }
}
