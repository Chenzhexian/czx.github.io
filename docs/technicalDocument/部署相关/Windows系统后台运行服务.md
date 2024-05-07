---
title: Windows系统后台运行服务
---

## 前言
我们再日常开发学习中，经常会在本地Windows系统上运行一些服务，比如：MySql、Redis、nacos等。有一些服务每次都得手动启动，比较麻烦，而且还会有一个窗口，非常的占位置。

这时候我们就会想，能不能让这些服务在后台运行呢？当然可以，下面就来介绍一下在Windows系统上后台运行服务的几种方法。

## 1.注册为 Wiodows 服务
如果我们需要在计算机上长时间运行某个程序，并且无论是谁在使用这台计算机，这个程序的运行都不受影响，我们就可以把它注册为一个Window 服务，由操作系统来帮我们管理。把某个程序注册为 Wiodows 服务的方式挺简单，具体如下：
```shell
"完整的可执行文件路径" --install [-manual] [服务名]
```
如果我们添加了 `-manual` 边项，就表示在 Windows 系统启动的时候不自动启动该服务，否则会自动启动。服务名也可以自己指定，如果不指定，则默认使用可执行文件的名称。

这里以`MySQL`为例，首先打开命令行窗口，输入下面的命令：

```shell
"C:\Program Files\MySQL\MySQL Server 5.7\bin\mysqld" --install MySQL
```

在把 `mysqld` 注册为Windows服务之后，就可以通过下面这个命令来启动 `MySQL` 服务器程序了:
```shell
net start MySQL
```

当然，如果你喜欢图形界面，可以通过 Windows 的服务管理器并用鼠标点击的方式来启动和停止服务

![](https://czxcab.cn/file/docs/1705382309884.jpg)

关闭这个服务也非常简单，只要把上面的`start`换成 `stop` 就行了，就像下面这样:
```shell
net stop MySQL
```
::: warning 注意
在注册服务的时候，需要使用管理员权限来运行命令行窗口。

有些服务不能通过这种方式来注册，那就得使用第二种方法了。
:::

## 2.使用 VBScript 脚本
### 1. 打开启动文件夹
按下 `Win + R `打开运行对话框。

输入 `shell:startup` 并按 Enter。打开当前用户的启动文件夹

![](https://czxcab.cn/file/docs/1705382445128.jpg)

### 2. 创建启动脚本
- 创建一个包含启动 Minio 命令的 VBScript 脚本。
- 将 VBScript 脚本保存为 .vbs 文件。
- 将 VBScript 脚本文件放置在启动文件夹中。
以下是一个简单的 VBScript 示例：

```shell
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd.exe /c start /B D:\minio\minio.exe server D:\minio\minioData", 0
Set WshShell = Nothing
```

下面是每行代码的解释：

1. Set WshShell = CreateObject("WScript.Shell")：

   - `CreateObject("WScript.Shell")` 创建一个 `WScript.Shell` 对象，该对象提供了访问系统的接口，允许执行命令、创建快捷方式等。

2. WshShell.Run "cmd.exe /c start /B D:\minio\minio.exe server D:\minio\minioData", 0：

   - `WshShell.Run` 方法用于运行外部命令。
   - `"cmd.exe /c start /B D:\minio\minio.exe server D:\minio\minioData"` 是要运行的命令。这个命令使用 `cmd.exe /c` 启动一个新的命令提示符实例，并使用 `start /B` 以后台方式启动 Minio 进程。
   - `, 0` 是运行的窗口风格，其中 0 表示隐藏窗口。

3. Set WshShell = Nothing
   - 释放 WshShell 对象，以释放资源。

### 3. 运行脚本

一旦您创建了 StartMinio.vbs 文件，您可以通过双击该文件来运行 VBScript 脚本并启动 Minio。

双击 StartMinio.vbs 文件。
如果一切正常，Minio 将以后台方式启动，而不会弹出命令台窗口。查看任务管理器的进程列表，可以看到 Minio 进程已经启动。

![](https://czxcab.cn/file/docs/1705382549343.jpg)
