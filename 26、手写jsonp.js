/**
 * jsonp获取请求数据(promise版)
 * @param {string}url
 * @param {object}data
 */
const jsonp = function (url, data) {
    return new Promise((resolve, reject) => {
        // 初始化url
        let dataString = url.indexOf("?") === -1 ? "?" : "";
        let callbackName = `jsonpCB_${Date.now()}`;
        url += `${dataString}callback=${callbackName}`;
        if (data) {
            // 有请求参数，依次添加到url
            for (let k in data) {
                url += `&${k}=${data[k]}`;
            }
        }
        let jsNode = document.createElement("script");
        jsNode.src = url;
        // 触发callback，触发后删除js标签和绑定在window上的callback
        window[callbackName] = (result) => {
            delete window[callbackName];
            document.body.removeChild(jsNode);
            if (result) {
                resolve(result);
            } else {
                reject("没有返回数据");
            }
        };
        // js加载异常的情况
        jsNode.addEventListener(
            "error",
            () => {
                delete window[callbackName];
                document.body.removeChild(jsNode);
                reject("JavaScript资源加载失败");
            },
            false
        );
        // 添加js节点到document上时，开始请求
        document.body.appendChild(jsNode);
    });
};

/**
 * jsonp获取请求数据（普通方式）
 * @param {object}options
 */
function jsonp(options) {
    // console.log(options);
    // 1. 产生不同的函数名(函数名随机)
    let callBackName =
        "itLike" +
        Math.random().toString().substr(2) +
        Math.random().toString().substr(2);
    // console.log(callBackName);
    // 2. 产生一个全局函数
    window[callBackName] = function (params) {
        // console.log(params);
        // console.log(options.success);
        if (params !== null) {
            options.success(params);
        } else {
            options.failure(params);
        }

        // 2.1 删除当前脚本标签
        scriptE.remove();
        // 2.2 将创建的全局函数设为null
        window[callBackName] = null;
    };

    // 3. 取出url地址
    let jsonpUrl;
    if (options.data !== undefined) {
        jsonpUrl =
            options.url + "?" + options.data + "&callBack=" + callBackName;
    } else {
        jsonpUrl = options.url + "?callBack=" + callBackName;
    }
    // console.log(jsonpUrl);

    // 4. 创建script标签
    let scriptE = document.createElement("script");
    scriptE.src = jsonpUrl;
    document.body.appendChild(scriptE);
}
