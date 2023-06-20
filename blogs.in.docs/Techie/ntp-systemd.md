# 在 `Systemd` 上设置 `NTP` 服务器  
默认情况下, `Linux`的默认`NTP` 服务器在国外, 国内几乎无法使用.   
因此，我们需要设置成教育网或境内的 `NTP`服务器.
## Systemd 修改方法  
```bash
sudo vim /etc/systemd/timesyncd.conf
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation; either version 2.1 of the License, or
#  (at your option) any later version.
#
# Entries in this file show the compile time defaults.
# You can change settings by editing this file.
# Defaults can be restored by simply deleting this file.
#
# See timesyncd.conf(5) for details.

[Time]
NTP=ntp.aliyun.com
#NTP=
#FallbackNTP=ntp.ubuntu.com
#RootDistanceMaxSec=5
#PollIntervalMinSec=32
#PollIntervalMaxSec=2048
```
## 常用的 `NTP` 服务器
```plain
# 以下常用
server cn.pool.ntp.org
server asia.pool.ntp.org
server cn.ntp.org.cn
server ntp.aliyun.com
server time.asia.apple.com

# 以下支持IPv6
server time.google.com
server time.cloudflare.com
server time.hko.hk
server ntp.nict.jp
server time.nist.gov
server ntp.tuna.tsinghua.edu.cn
server ntp.neu.edu.cn
server ntp.nc.u-tokyo.ac.jp
server ntp.ix.ru

# 腾讯
server ntp.tencent.com

# 阿里
server ntp1.aliyun.com
server ntp2.aliyun.com
server ntp3.aliyun.com
server ntp4.aliyun.com
server ntp5.aliyun.com
server ntp6.aliyun.com
server ntp7.aliyun.com

# 微软 Windows 
server time.windows.com

# 苹果 macOS
server ime.apple.com
server time.asia.apple.com
server time.euro.apple.com
# 苹果 镜像
server time1.apple.com
server time2.apple.com
server time3.apple.com
server time4.apple.com
server time5.apple.com
server time6.apple.com
server time7.apple.com

# Google 
server time.google.com
server time1.google.com
server time2.google.com
server time3.google.com
server time4.google.com

# 参考: https://www.cnblogs.com/zkwarrior/p/12991673.html
```
