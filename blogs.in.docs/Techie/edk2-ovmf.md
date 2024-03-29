# 手工编译 EDK II - OVMF
## I. 准备工作
以下是一些常用的 UEFI 环境工具，可以顺带安装上。
```bash
sudo apt install nasm iasl build-essential uuid-dev python wget nano git # 我就不信有人还没装 git
git clone https://github.com/tianocore/edk2.git
cd edk2
```
## II. 拉取 submodules (不要忘了!!)
```bash
git submodules sync
git submodules update init
# 觉得部署的慢的同学可以编辑 .gitmodules 换成 Gitee 源
```
## III. 部署 BaseTools 
```bash
$ pwd
~/edk2
$ cd BaseTools && make && cd ..

```
## IV. (可选) 定制
进入 MdeModulePkg / Logo,  编辑Logo.bmp. 注意尺寸适中，不然到时候显示器装不下。

## V. 编译
```bash
$ pwd
~/edk2
$ cd OvmfPkg && ./build && cd ..
# 成品在Build/OvmfX64/DEBUG_GCC5/FV/OVMF.fd
```
## VI. 测试
```bash
qemu-system-x86_64 --enable-kvm --smbios type=0,uefi=on --bios /path/to/edk2
```
## VII. 使用
替换系统默认的(位于 `/usr/share/OVMF/OVMF(-CODE/-VARS).fd`)即可  
但更推荐动态指定
全程耗时 10 ~ 15 min, 难度较小。
