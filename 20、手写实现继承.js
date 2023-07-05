// ES6类继承
class People {
    constructor(name = 'wang', age = '27') {
        this.name = name;
        this.age = age;
    }
    eat() {
        console.log(`${this.name} ${this.age} eat food`)
    }
}
//继承父类
class Woman extends People {
    constructor(name = 'ren', age = '27') {
        //继承父类属性
        super(name, age);
    }
    eat() {
        //继承父类方法
        super.eat();
        console.log('好吃！')
    }
}
let wonmanObj = new Woman('xiaoxiami', '18');
wonmanObj.eat();


// 寄生式组合继承
function Person(obj) {
    this.name = obj.name
    this.age = obj.age
}
Person.prototype.add = function(value){
    console.log(value)
}
var p1 = new Person({name:"番茄", age: 18})

function Person1(obj) {
    Person.call(this, obj) // 偷构造函数式继承
    this.sex = obj.sex
}
// 这一步是继承的关键
Person1.prototype = Object.create(Person.prototype); // 原型链继承
Person1.prototype.constructor = Person1;

Person1.prototype.play = function(value){
    console.log(value)
}
var p2 = new Person1({name:"鸡蛋", age: 118, sex: "男"})