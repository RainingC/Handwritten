class Subject {
    #Observers = [];
    #state = 'xxxx';
    #name = '';
    constructor(name) {
        this.#name = name;
    }

    attach(Observer) {
        this.#Observers.push(Observer);
    }

    setState(state) {
        this.#state = state;
        this.#Observers.forEach((obj) => {
            obj.update(this.#state);
        });
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update(newState) {
        console.log(`${this.name}say:${newState}`);
    }
}

// 被观察者 灯
let sub = new Subject("灯");
let mm = new Observer("小明");
let jj = new Observer("小健");

// 订阅 观察者
sub.attach(mm);
sub.attach(jj);

sub.setState("灯亮了来电了");
