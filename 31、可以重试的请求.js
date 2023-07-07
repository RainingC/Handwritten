function request(url, maxCout = 5) {
    return fetch(url).catch((error) => {
        maxCout <= 0 ? Promise.reject(error) : request(url, maxCout - 1);
    });
}