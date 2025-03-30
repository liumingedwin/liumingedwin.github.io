window.$docsify.plugins = window.$docsify.plugins || [];
(function decrypt_docsify_content_plug() {
    return window.decryption_plug = (hook, vm) => {
        hook.beforeEach(function (content) {
            let scontent = content.toString()
            console.log(scontent, typeof scontent)
            const defprefix = "aes";
            if (scontent.indexOf(defprefix) != 0)
                return scontent;
            console.log(String.prototype.replace.call(scontent, defprefix, ""))
            return CryptoJS.AES.decrypt(String.prototype.replace.call(scontent, defprefix, "").replaceAll(/\s/g,''), prompt("Input: ", "password")).toString(CryptoJS.enc.Utf8)
                ;
        })
    };
})();
window.$docsify.plugins = [window.decryption_plug, ...window.$docsify.plugins];