// 防抖
function myDebounce(fn, wait, immediate) {
    let timer = null,
        init = true;
    return function fn (...args) {
        clearInterval(timer);
        timer = null;
        if (immediate && init) {
            fn.call(this, args);
            init = false;
        } else {
            setTimeout(() => {
                init = true;
                fn.call(this, args);
            }, wait);
        }
    }
}


// 节流
function myThrottle (fn, wait, immediate) {
    let time = null;
    let init = true;
    if (immediate) {
        return function (...args) {
            if (init) {
                init = false;
                fn.call(this, args)
                time = setTimeout(() => {
                    init = true
                }, wait);
            }
        }
    }
    return function (...args) {
        if (time == null) {
            time = setTimeout(() => {
                fn.call(this, args)
                clearInterval(time)
                time = null
            }, wait);
        }
    }
}