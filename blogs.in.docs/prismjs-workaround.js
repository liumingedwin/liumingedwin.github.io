/*
window.$docsify.plugins = window.$docsify.plugins || [];
console.log("qwq");
(function decrypt_docsify_content_plug() {
    return window.prismjs_workaround = (hook, vm) => {
        hook.doneEach(function () {
            console.log("notice. ");
            let app = document.querySelector("div#app");
            let interval = setInterval(Prism.highlightAllUnder, 500.0, app);
            console.log(app, interval);
        });
    };
})();
console.log($docsify)
window.$docsify.plugins = [window.prismjs_workaround, ...window.$docsify.plugins];
*/
(function () {
    // 选择需要观察变动的节点
    // const targetNode = document.querySelector("article#main");
    const targetNode = document.querySelector("body");
    console.log(targetNode)
    // 观察器的配置（需要观察什么变动）
    const config = { subtree: true, childList: true, attributes: true };
    let las = new Date()
    // 当观察到变动时执行的回调函数
    const callback = function (mutationsList, observer) {
        if (new Date() - las <= 6000) return;
        las = new Date();
        observer.disconnect();
        const loc = document.querySelector("article#main");
        if (Prism)
            // Prism.highlightAll();
            Prism.highlightAllUnder(loc ? loc : targetNode);
        if(observer)
        observer.observe(targetNode, config);
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    requestAnimationFrame(callback)
    // 之后，可停止观察
})();