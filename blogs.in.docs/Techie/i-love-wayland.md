> Fxxk you NVIDIA! :(

[labwc totorials](https://mephisto.cc/tech/labwc/  )
## Login Manager & Greeter
目前在 Wayland 上运行的 Login Manager 主要有 gdm, greetd(主要为 Wayland greeter), sddm. gdm, sddm 太重了，我不想用. 
所以，推荐使用 greetd 又快又好看. 
想用 Wlgreet, 结果发现 Debian Testing 的版本有 bug. 遂转至 gtkgreet. 在 Debian 上查无此包, 自己编译.
## Desktop / Window Manager
### Cage (这也算吗)
一个全屏 Kiosk 窗口, 可以放一个 Terminal. 
### GNOME
太重啦!! 
```bash
sudo apt-get install tasks-gnome(好像是吧)
```
### KDE
同上. 好一点. 
### Labwc 
目测还行. 就是有点简陋. 
>> Todo: Debian Screenshots

References:   
[Arch Linux Wiki: Wayland](https://wiki.archlinuxcn.org/wiki/Wayland)   
[Arch Linux Wiki: Greetd](https://wiki.archlinux.org/title/Greetd)  
