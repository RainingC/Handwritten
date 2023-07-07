// 判断是否是奇数
function is0dd(n) {
    if (typeof n !== 'number') {
        throw new TypeError(`${n} is not a number`);
    }

    return n % 2 === 1 || n % 2 === -1;
    // 还要处理小数的情况
}
