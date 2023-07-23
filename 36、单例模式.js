// 用代理实现单例模式
let CreateDiv = function (html) {
    this.html = html;
    this.init();
};
CreateDiv.prototype.init = function () {
    let div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
};
let ProxyCreateDiv = (function () {
    let instance = null;
    return function (html) {
        // 惰性单例
        if (!instance) {
            instance = new CreateDiv(html);
        }
        return instance;
    };
})();
let divInstance1 = new ProxyCreateDiv("why");
let divInstance2 = new ProxyCreateDiv("www");
console.log(divInstance1 === divInstance2); // 输出true
