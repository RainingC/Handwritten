function ajax(url, method, body, headers) {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open(method, url);
        for (const key in headers) {
            req.setRequestHeader(key, headers[key]);
        }
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status >= 200 && req.status <= 300) {
                    resolve(req.responseText);
                } else {
                    reject(req);
                }
            }
        };
        req.send(body);
    })
}