// 防抖
function myDebounce(fn, wait, immediate) {
    let timer = null,
        canCall = true;
    return function (...args) {
        clearTimeout(timer);
        timer = null;
        if (immediate && canCall) {
            canCall = false;
            fn.call(this, args);
        } else {
            timer = setTimeout(() => {
                canCall = true;
                fn.call(this, args);
            }, wait);
        }
    }
}


// 节流
function myThrottle (fn, wait, immediate) {
    let time = null;
    let canCall = true;
    if (immediate) {
        return function (...args) {
            if (canCall) {
                canCall = false;
                fn.call(this, args)
                time = setTimeout(() => {
                    canCall = true
                }, wait);
            }
        }
    }
    return function (...args) {
        if (time == null) {
            time = setTimeout(() => {
                fn.call(this, args)
                clearTimeout(time)
                time = null
            }, wait);
        }
    }
}