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