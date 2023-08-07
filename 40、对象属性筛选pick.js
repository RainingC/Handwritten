const pick = (obj, keys) => {
    return Object.keys(obj).reduce((newData, key) => {
        if (keys.includes(key)) {
            newData[key] = obj[key];
        }
        return newData;
    }, {});
};

// test
console.log(pick({ a: 1, b: 2, c: 3 }, ["a", "b"]));
