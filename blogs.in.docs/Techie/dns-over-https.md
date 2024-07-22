# 开启 `DoH`，加速海外网站访问，保护用户隐私
RFC8484: <https://mirrors.nju.edu.cn/rfc/rfc8484.html>  
容易发现，最近一段时间国内用户很难打开 `GitHub`，原因是被 `DNS` 污染了。 一方面是运营商的问题，另一方面是没有加密 `DNS` 解析。
因此，开启 `DNS OVER HTTPS (DoH)` 迫在眉睫。  
在 `Chrome` 中, 搜索 `DNS Over HTTPS` 即可。
容易发现，`Windows 11` 自带 `DNS Over HTTPS` 解析。
在 `Windows 10` 上，推荐 [AuroraDNS](https://github.com/mili-tan/AuroraDNS.GUI/).   
下载直链: <https://github.com/mili-tan/AuroraDNS.GUI/releases/download/220222/AuroraDNS.GUI.220222.Release.7z> 
附: DNS 查询网站: <https://dns.icoa.cn/>  
好用的DNS来啦: 
JSON: 
1. 国外, 无污染
dnssb: 
<https://doh.dns.sb/dns-query?dns=AAABAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB>   
<https://doh.dns.sb/dns-query?name=example.org>
Apple: <https://doh.dns.apple.com/dns-query?dns=AAABAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB>
Cloudflare:
<https://cloudflare-dns.com/dns-query>
<https://1.1.1.1/dns-query>
<https://1.0.0.1/dns-query>
3. 国内
<https://dns.alidns.com/resolve?name=example.org>
Aliyun: <https://dns.alidns.com/dns-query?dns=AAABAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB>
sm2 政企国密: <https://sm2.doh.pub/dns-query?dns=AAABAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB>
<https://www.geekdns.org/>  
360:
<https://doh.360.cn/resolve?name=example.org>
<https://doh.360.cn/dns-query?dns=AAABAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB>

中科大的neatdns挂了，不建议使用  
dns.google: 仅UDP

友情链接: 
1. `https://gh.ddlc.top/<URL>`
2. `https://jsq.092333.xyz/`
