window.$docsify.plugins = window.$docsify.plugins || [];
(function decrypt_docsify_content_plug() {
    return window.prismjs_workaround = (hook, vm) => {
        hook.doneEach(function () {
            setTimeout(Prism.highlightAllUnder, 500.0, document.body);
            setTimeout(Prism.highlightAllUnder, 1000., document.body);
            setTimeout(Prism.highlightAllUnder, 2000., document.body);
        })
    };
})();
window.$docsify.plugins = [window.prismjs_workaround, ...window.$docsify.plugins];