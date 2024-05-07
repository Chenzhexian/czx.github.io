---
title: yarn2.0+版本安装
---

## 前言
先说说为什么需要yarn2.0+版本，因为我的项目中用到了vuepress-plugin-comment2这个插件，这个插件需要yarn2.0+版本才能安装成功。

![](https://czxcab.cn/file/docs/yarn1.jpg)

根据图中提示，我们需要安装yarn2.0+版本。

## 安装nodejs
其实nodejs已经安装过了，只不过我在升级yarn2.0+版本的时候，老不成功也找不到原因，所以这里直接重新安装nodejs。

nodejs官网：[https://nodejs.org/en](https://nodejs.org/en)

### 下载安装nodejs
进入官网后，我们选择左边这个稳定版本，下载nodejs。

![](https://czxcab.cn/file/docs/yarn2.jpg)

下载完后点击安装，一路下一步即可。如果之前安装过nodejs，把之前的文件夹删除即可。

安装完成后，打开cmd命令窗口，输入node -v，如果显示版本号，则说明安装成功。

![](https://czxcab.cn/file/docs/yarn3.jpg)

### 相关配置
更换npm源，因为npm的源在国外，下载速度很慢。我们换成淘宝的源。
```shell
npm config set registry https://registry.npm.taobao.org
```

然后我们再nodejs的文件夹下创建两个文件夹，`node_global`和`node_cache`，分别用来存放全局安装的包和缓存。

![](https://czxcab.cn/file/docs/yarn4.jpg)

创建完两个文件夹之后，打开命令行界面，输入下面命令
```shell
#prefix = 创建的node_global文件夹所在路径
npm config set prefix "D:\nodejs\node_global"

#cache = 创建的node_cache文件夹所在路径
npm config set cache "D:\nodejs\node_cache"
```

![](https://czxcab.cn/file/docs/yarn5.jpg)

如果之前安装过nodejs,重新配置：删除`C:\Users\yi081\.npmrc`文件重新生成。如果 .npmrc 不在这个目录下，就 C 盘全局搜一下。

### 环境变量
在系统变量下新建`NODE_PATH`，输入`D:\nodejs\node_modules`。

![](https://czxcab.cn/file/docs/yarn6.jpg)

然后在path中添加`D:\nodejs\node_global`。

![](https://czxcab.cn/file/docs/yarn7.jpg)

## 安装yarn
安装完nodejs后，我们就可以安装yarn了，打开DOS命令窗口，输入下面命令进行安装：
```shell
#这个是安装yarn2.0+版本
npm install -g yarn@berry

#这个是安装yarn1.0版本
npm install -g yarn
```
输入命令我们会看到下面的报错，这是因为我们的文件夹权限不够，我们需要把文件夹的权限修改一下 。

![](https://czxcab.cn/file/docs/yarn8.jpg)

我们找到刚刚新建的`node_cache`和`node_global`文件夹，右键属性，点击安全，点击编辑，点击完全控制然后确认。

![](https://czxcab.cn/file/docs/yarn9.jpg)

我们再输入命令，安装成功。输入`yarn -v`出现版本号，则说明安装成功。

![](https://czxcab.cn/file/docs/yarn10.jpg)

运行以下命令，将 Yarn 2 设置为默认版本：
```shell
yarn set version berry
```

这里回去github上下载yarn2.0+的js文件，下载速度很慢，所以我们可以直接复制链接到游览器,然后复制代码到本地进行修改。

![](https://czxcab.cn/file/docs/yarn11.jpg)

复制链接 [https://github.com/yarnpkg/berry/raw/master/packages/yarnpkg-cli/bin/yarn.js](https://github.com/yarnpkg/berry/raw/master/packages/yarnpkg-cli/bin/yarn.js) 到游览器，下载yarn2.0+的js文件。

然后找到`D:\nodejs\node_global\node_modules\yarn\bin`文件夹，找到`yarn.js`文件,直接把刚刚复制的js覆盖掉`yarn.js`。

然后重新执行`yarn set version berry`命令，将 Yarn 2 设置为默认版本。

![](https://czxcab.cn/file/docs/yarn12.jpg)

最后重新进入项目，输入`yarn install`安装依赖。

成功安装依赖没有报错，启动项目，速度非常快！

## 总结
这个过程其实很简单，但是网上很多教程都是基于yarn1.0版本，所以安装的时候会遇到一些坑。
还有一点就是，安装的时候，`yarn set version berry`命令一直报错，其实是一样网络的问题，我们只需要把`yarn.js`文件下载下来，然后覆盖掉`yarn.js`就可以了。
