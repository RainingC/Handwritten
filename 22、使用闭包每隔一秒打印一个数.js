for (var i = 1; i <= 5; i++) {
    (function (i) {
        setTimeout(() => console.log(i), 1000 * i)
    })(i)
}