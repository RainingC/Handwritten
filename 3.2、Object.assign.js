Object.assign2 = function (target, ...source) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
    }
    let ret = Object(target);
    source.forEach(item => {
        if (item !== null) {
            for (let key in item) {
                if (item.hasOwnProperty(key)) {
                    ret[key] = item[key];
                }
            }
        }
    });
    return ret;
}