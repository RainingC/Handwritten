var s = document.querySelector('div');
s.addEventListener('mousedown', function (e) {
    var x = e.pageX - s.offsetLeft;
    var y = e.pageY - s.offsetTop;

    document.addEventListener('mousemove', fn);
    function fn(e) {
        s.style.left = e.pagex - x + 'px';
        s.style.top = e.pageY - y + 'px';
    }

    document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', fn);
    });
})





