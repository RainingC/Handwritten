function* walk(str) {
    let part = '';
    let terminals = ['.', '-'];
    for (var i = 0; i < str.length; i++) {
        if (terminals.includes(str[i])) {
            //终结符
            yield part;
            part = '';
        } else {
            part += str[i];
        }
    }
    if (part) {
        yield part;
    }
}





const testStr = "1.5.6-alpha.1";
const itor = walk(testStr);
for (const item of itor) {
    console.log(item);
    // 在这里一位一位的比较即可
}


// console.log(itor.next());
// console.log(itor.next());
// console.log(itor.next());
// console.log(itor.next());
// console.log(itor.next());
// console.log(itor.next());
