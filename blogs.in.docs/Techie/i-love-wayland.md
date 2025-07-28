> Fxxk you NVIDIA! :(

[labwc totorials](https://mephisto.cc/tech/labwc/  )
## Login Manager & Greeter
目前在 Wayland 上运行的 Login Manager 主要有 GDM, SDDM, LightDM. GDM, SDDM 太重了，不想用. LightDM 总感觉不好用. 
所以，推荐使用 greetd 又快又好看. 
想用 Wlgreet, 结果发现 Debian Testing 的版本有 bug. 遂转至 gtkgreet. 在 Debian 上查无此包, 自己编译. 这是我编译的第一个包, 爽!  
Upd on Jul 28 2025: 已经添加到源. 还未尝试. 
## Desktop / Window Manager
### Cage (这也算吗)
一个全屏 Kiosk 窗口, 可以放一个 Terminal.     
在更新系统或者编译软件包时特别有用! 
### GNOME
太重啦!! 
```bash
sudo aptitude install task-gnome-desktop
# 小贴士: aptitude 似乎会更聪明! 
```
### KDE
```bash
sudo aptitude install task-kde-desktop
```
也比较重, 但好一点. 
### Labwc 
目测还行. 就是有点简陋. 所有的组件都需要自行寻找. 
常用的有 Waybar, gtklock, rofi-wayland, wlogout, ksnip, polkit 什么之类的. 
从前它不支持工作区切换, 使用了一个极其 hackful 的 solution. 
如今 Waybar 的工作区 indicator 从 sway/workspaces 到 hyprland/workspaces 再到 wlr/workspaces 步入 ext/workspaces, 并且随着迎来了皆大欢喜的结局. 
toplevel icons 也被加入, 爽!
![labwc screenshot 1](./i-love-wayland-assets/ksnip_20250728-094251.png)
<video id="labwc_recordings_1" controls="" preload="none" width="400" height="300">
     <source id="mp4" src="./Techie/i-love-wayland-assets/2025-07-28%2011-07-13.mp4" 
         type="video/mp4">
      <p>Your user agent does not support the HTML5 Video element.</p>
</video>
<video id="labwc_recordings_2" controls="" preload="none" width="400" height="300">
     <source id="mp4" src="./Techie/i-love-wayland-assets/2025-07-28%2011-08-31.mp4" 
         type="video/mp4">
      <p>Your user agent does not support the HTML5 Video element.</p>
</video>
<video id="labwc_recordings_3" controls="" preload="none" width="400" height="300">
     <source id="mp4" src="./Techie/i-love-wayland-assets/2025-07-28%2011-11-02.mp4" 
         type="video/mp4">
      <p>Your user agent does not support the HTML5 Video element.</p>
</video>

### Wayfire
继承了 Compiz 的良好基因, 华丽却有着很低的 Memory Cost.     
和 labwc 是类似的, 但是更加 Fancy.    
我花了一点时间写了些 ipc scripts, 和 gtk theme, 成就了这华丽的界面. 圆角是用 outline 搞定的. 写完才回的 labwc.     
有趣的是, 这些 scripts 起初是用 Python 编写, 跑在 pypy3 上, 现在已经是 C/C++ 编写了, 更快, 更高, 更强. 
![wayfire screenshot 1](./i-love-wayland-assets/ksnip_20250728-094935.png)
![wayfire screenshot 2](./i-love-wayland-assets/ksnip_20250728-095127.png)
![wayfire screenshot 3](./i-love-wayland-assets/ksnip_20250728-095203.png)
## References:   
[Issues on Labwc workspaces](https://github.com/labwc/labwc/issues/881)
[XWayland icons](https://github.com/labwc/labwc/pull/2760)
[Arch Linux Wiki: Wayland](https://wiki.archlinuxcn.org/wiki/Wayland)   
[Arch Linux Wiki: Greetd](https://wiki.archlinux.org/title/Greetd)  
[Waybar fork supporting ext/workspaces](https://github.com/jp7677/Waybar.git)
