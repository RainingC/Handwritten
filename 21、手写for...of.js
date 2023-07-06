const gen = (erg) => {
    let it = erg[Symbol.iterator]()
    let next = { done: false }
    while (!next.done) {
        next = it.next()
        if (!next.done) {
            console.log(next.value)
        }
    }
}


const array = [{ age: 123, name: "1" }, { age: 123, name: "2" }, { age: 123, name: "3" }]


gen(array)
// 等同于
for (let value of array) {
    console.log(value)
}
