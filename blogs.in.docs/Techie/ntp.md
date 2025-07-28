# 设置 `NTP` 服务器  

因此，我们需要更换 `NTP` 服务器.
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
## Windows 修改方法
注意到我们有一个命令: `w32tm`!
```shell
rem 以下命令任选其一, 在管理员权限下运行
net start w32time
sc start w32time
net start "Windows Time"
```
看看帮助文件
```shell
w32tm /config [/computer:<target>] [/update]
    [/manualpeerlist:<peers>] [/syncfromflags:<source>]
    [/LocalClockDispersion:<seconds>]
    [/reliable:(YES|NO)]
    [/largephaseoffset:<milliseconds>]
  computer:<target> - 调整 <target> 配置。
    如果未指定，默认设置为本地计算机。
  update - 通知时间服务配置已更改，
    以使更改生效。
  manualpeerlist:<peers> - 将手动对等机列表设置为 <peers>，
    这是以空格分隔的 DNS 和/或 IP 地址列表。
    如果指定多个对等机，必须用引号
    将此开关引起来。
```
于是命令呼之欲出
```shell
w32tm /config /update "/manualpeerlist:ntp.aliyun.com cn.pool.ntp.org time.asia.apple.com ntp.tencent.com ntp.aliyun1.com" /syncfromflags:all
```
一键导入注册表: 

```yml 
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\DateTime\Servers]
@="1"
"1"="ntp.aliyun.com"
"2"="ntp.tencent.com"
"3"="cn.pool.ntp.org"
"4"="ntp1.aliyun.com"
"5"="time.asia.apple.com"
"6"="ntp2.aliyun.com"
"7"="asia.pool.ntp.org"
"8"="ntp3.aliyun.com"
"9"="time.eu.apple.com"
"10"="ntp4.aliyun.com"
"11"="time.ustc.edu.cn"
"12"="time1.cloud.tencent.com"
"13"="ntp.sjtu.edu.cn"
"14"="time2.cloud.tencent.com"
"15"="ntp.fudan.edu.cn"
"16"="time3.cloud.tencent.com"
;   ""="time.edu.cn"
;   lack of maintainense
;   ""="ntp.neu.edu.cn"
;   ""="s2c.time.edu.cn"
;   ""="s2f.time.edu.cn"
;   ""="s2k.time.edu.cn"
;   ""="ntp.tuna.tsinghua.edu.cn"
;   it died. 
"17"="ntp5.aliyun.com"
"18"="time4.cloud.tencent.com"
"19"="ntp6.aliyun.com"
"20"="time5.cloud.tencent.com"
"21"="ntp7.aliyun.com"
"22"="ntp.ntsc.ac.cn"
"23"="time.ustc.edu.cn"
"24"="time.nist.gov"
"25"="time.windows.com"
```

```shell
timedate.cpl
%windir%\System32\rundll32.exe shell32.dll,Control_RunDLL timedate.cpl,,0
%windir%\System32\rundll32.exe shell32.dll,Control_RunDLL timedate.cpl,,1
rem pass 2,3 failed
```
## 常用的 `NTP` 服务器
```plain
# 以下常用
server cn.pool.ntp.org
server asia.pool.ntp.org
server cn.ntp.org.cn            # failed
server ntp.aliyun.com
server time.asia.apple.com

# 以下支持IPv6
server time.google.com
server time.cloudflare.com
server time.hko.hk
server ntp.nict.jp
server time.nist.gov
server ntp.tuna.tsinghua.edu.cn #   failed
server ntp.neu.edu.cn           #   failed
server ntp.nc.u-tokyo.ac.jp
server ntp.ix.ru

# 腾讯
server ntp.tencent.com
server time1.cloud.tencent.com
server time2.cloud.tencent.com
server time3.cloud.tencent.com
server time4.cloud.tencent.com
server time5.cloud.tencent.com

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
server ime.apple.com            #   failed
server time.asia.apple.com
server time.euro.apple.com
# 苹果 镜像
#   failed
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
