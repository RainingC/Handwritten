function request(url, maxCout = 5) {
    return fetch(url).catch(function (err) {
        maxCout <= 0 ? Promise.reject(err) : request(url, maxCout--);
    });
}