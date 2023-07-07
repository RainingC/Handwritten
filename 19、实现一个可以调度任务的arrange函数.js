function arrange (taskId) {
    const tasks = [];
    tasks.push(() => {
        console.log(`${taskId} is notified`);
    });

    async function execute () {
        for (const task of tasks) {
            await task();
        }
    }
    function doSomething () {
        tasks.push(() => {
            console.log(`Start to ${taskId}`);
        });
        return this;
    }
    function wait (duration) {
        tasks.push(() => {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, duration * 1000);
            });
        })
        return this;
    }
    function waitFirst (duration) {
        tasks.unshift(() => {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, duration * 1000);
            });
        })
        return this;
    }

    return {
        execute,
        do: doSomething,
        wait,
        waitFirst
    }
}