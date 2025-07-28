window.$docsify.plugins = window.$docsify.plugins || [];
//	console.log("qwq");
(function decrypt_docsify_content_plug() {
    return window.prismjs_workaround = (hook, vm) => {
/*
        hook.afterEach((html) => {
		const div = document.createElement("div");
		div.innerHTML = html;
		div.hidden = true
		console.log(Object.keys(Prism.languages))
		document.body.appendChild(div);
//		Prism.highlightAllUnder(div, false, (...args) => console.warn(args));
		Array.from(div.querySelectorAll("pre")).forEach(v => {
			//	Prism.highlightElement(v);
		});
//	警钟敲烂:	highlightAllUnder 抄成 highlightAll
//			async 写成了 true
		console.log(div.innerHTML);
		return div.innerHTML; 
        });
*/
        hook.doneEach(() => {
		window.PrismHandler = () => {
			console.log(JSON.stringify(Object.keys(Prism.languages)));
			requestAnimationFrame(Prism.highlightAll); 
		}; 
		if(window.PrismLoaded) window.PrismHandler(); 
	});
    };
})();
//	console.log($docsify)
window.$docsify.plugins = [window.prismjs_workaround, ...window.$docsify.plugins];
/*
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
            Prism.highlightAllUnder(targetNode);
        if(observer)
        observer.observe(loc, config);
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    requestAnimationFrame(callback)
    // 之后，可停止观察
})();
*/


