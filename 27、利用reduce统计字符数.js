var str = 'fgasdfadfdasd' ;
var result = str.split("").reduce((a, b) => (a[b]++ || (a[b] = 1), a),{});
console.log(result);