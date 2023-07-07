function isFullCombination(datas) {
    if (datas.length === 0) return false;
    const fieldMap = new Map(); // 字段映射对象
    const keys = Object.keys(datas[0]);
    const valueMap = new Map();
    let n = 1;
    const combinationsSet = new Set();
    for (const item of datas) {
        let combination = '';
        for (const key of keys) {
            const value = item[key];
            let valueSet = fieldMap.get(key);
            if (!valueSet) {
                valueSet = new Set();
                fieldMap.set(key, valueSet);
            }
            valueSet.add(value);
            let num = valueMap.get(value);
            if (!num) {
                num = n++;
                valueMap.set(value, num);
            }
            combination += `-${num}`;
        }
        if (combinationsSet.has(combination)) {
            return false;
        }
        combinationsSet.add(combination)
    }

    const totalLength = [...fieldMap].reduce((a, [, v]) => (a *= v.size), 1)

    console.log(totalLength);
    return totalLength === datas.length;
}


const inputData = [
    { 字段1: '甲', 字段2: 'a', 字段3: 1 },
    { 字段1: '甲', 字段2: 'a', 字段3: 2 },
    { 字段1: '甲', 字段2: 'a', 字段3: 3 },
    { 字段1: '甲', 字段2: 'b', 字段3: 1 },
    { 字段1: '甲', 字段2: 'b', 字段3: 2 },
    { 字段1: '甲', 字段2: 'b', 字段3: 3 },
    { 字段1: '乙', 字段2: 'a', 字段3: 1 },
    { 字段1: '乙', 字段2: 'a', 字段3: 2 },
    { 字段1: '乙', 字段2: 'a', 字段3: 3 },
    { 字段1: '乙', 字段2: 'b', 字段3: 1 },
    { 字段1: '乙', 字段2: 'b', 字段3: 2 },
    { 字段1: '乙', 字段2: 'b', 字段3: 3 },
]

console.log(isFullCombination(inputData))