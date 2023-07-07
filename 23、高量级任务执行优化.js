/**
 * 运行一个耗时任务
 * 如果要异步执行任务，请返回promise
 * 要尽快完成任务，同事不要让页面产生卡顿
 * 尽量兼容更多浏览器
 * @param {Function} task 
 */
function runTask(task) {
    // task(); // 直接运行  阻塞

    // return new Promise(function(resolve) {
    //     Promise.resolve().then(() => {
    //         task();
    //         resolve();
    //     })
    // }); // 微任务   阻塞

    // return new Promise(function(resolve) {
    //     setTimeout(() => {
    //         task();
    //         resolve();
    //     }, 0);
    // }); // 宏任务   卡顿

    // return new Promise(function(resolve) {
    //     requestAnimationFrame(() => {
    //         task();
    //         resolve();
    //     });
    // }); raq   阻塞

    return new Promise(function(resolve) {
        _runTask(task, resolve);
    });
}

function _runTask(task, callback) {
    // requestIdleCallback((idle) => { // 兼容性差
    //     if (idle.timeRemaining() > 0) {
    //         task();
    //         callback();
    //     } else {
    //         _runTask(task, callback);
    //     }
    // });

    let start = Date().now();
    requestAnimationFrame(() => { // 兼容性好
        if (Date.now() - start < 16.6) {
            task();
            callback();
        } else {
            _runTask(task, callback);
        }
    });
}