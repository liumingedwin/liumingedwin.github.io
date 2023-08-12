# 开启 `DoH`，加速海外网站访问，保护用户隐私
容易发现，最近一段时间国内用户很难打开 `GitHub`，原因是被 `DNS` 污染了。 一方面是运营商的问题，另一方面是没有加密 `DNS` 解析。
因此，开启 `DNS OVER HTTPS (DoH)` 迫在眉睫。
在 `Windows` 上，推荐 [AuroraDNS](https://github.com/mili-tan/AuroraDNS.GUI/).   
下载直链: <https://github.com/mili-tan/AuroraDNS.GUI/releases/download/220222/AuroraDNS.GUI.220222.Release.7z>  
附: DNS 查询网站: <https://dns.icoa.cn/>  
需要注意的是，请使用带 dns-query 的符合 [RFC8484](http://mirrors.nju.edu.cn/rfc/rfc8484.html) 的 `dns` 喂给系统，上面工具的则较为随意
