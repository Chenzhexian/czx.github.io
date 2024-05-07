---
title: 一篇搞定maven
---
## 1.Maven简介
### 1.1 Maven概述
Maven 是一个软件项目管理工具，可以对 Java 项目进行全自动构建，管理项目所需要的依赖。

Maven 曾是 Jakarta 项目的子项目，现为由 Apache 软件基金会主持的独立 Apache 项目。

### 1.2 Maven官网
Maven 官方网址：[https://maven.apache.org/](https://maven.apache.org/)

Maven 依赖搜索：[https://mvnrepository.com/](https://mvnrepository.com/)

### 1.3 Maven 下载安装
#### 1.3.1 下载
首先，去[Maven官网](https://maven.apache.org/)下载Maven 压缩包。可能有点慢，可以挂个梯子啥的。

![](https://czxcab.cn/file/docs/maven1.jpg)
![](https://czxcab.cn/file/docs/maven2.jpg)

#### 1.3.2 安装
下载完毕，右键解压，例如我解压完成以后的目录路径如下：`D:\maven\apache-maven-3.6.1`

![](https://czxcab.cn/file/docs/maven3.jpg)

::: warning 注意
使用 3.x 版本的 Maven 建议 Java 的 JDK 版本应该是 1.7+，我这里使用的是 JDK1.8
:::

新建一个系统环境变量：
- 变量名：`MAVEN_HOME`
- 变量值：`D:\maven\apache-maven-3.6.1`

![](https://czxcab.cn/file/docs/maven4.jpg)

编辑 Path 系统环境变量：
- 新增行：`%MAVEN_HOME%\bin`

![](https://czxcab.cn/file/docs/maven5.jpg)

按下 windows键 + R键，输入`cmd` ，在弹出的命令行窗口中，输入`mvn -v`能够正确输出版本信息，则证明 mvn 安装成功。

![](https://czxcab.cn/file/docs/maven6.jpg)

## 2.Maven 项目结构
### 2.1 标准结构
```text
maven-demo（项目名称）
|---------pom.xml（项目配置文件）
|---------src
          |---------main（主程序目录）
                    |---------java（主程序的Java源文件目录）
                    |---------resources（主程序的资源文件目录）
          |---------test（测试程序目录）
                    |---------java（测试程序的Java源文件目录）
                    |---------resources（测试程序的资源文件目录）   
```

接下来，我们就按照标准目录创建一个 Maven工程 ，创建位置，你可以任意，但是我建议你创建在桌面上，因为我也是这样做的。

创建完标准结构以后，我们需要一些代码和配置，来帮助我们完成接下来的学习，在这里，你可以不理解这些代码和配置的含义。

这些代码和配置在这一章节不是重点，后边会讲，重点是标准结构长什么样子，这些代码和配置主要是为了学习接下来的 Maven命令。

找到 pom.xml 在里边写入以下配置：
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <!-- groupId一般为公司或者组织域名的反写 -->
  <groupId>com.caochenlei</groupId>
  <!-- artifactId一般为当前项目或者模块的名称 -->
  <artifactId>maven-demo</artifactId>
  <!-- version代表当前项目或者模块的版本号 -->
  <version>0.0.1-SNAPSHOT</version>
</project>
```
### 2.2 POM文件
POM 是 Maven 工程的基本工作单元，是一个 XML 文件，包含了项目的基本信息，用于描述项目如何构建，声明项目依赖等等。

执行任务或目标时，Maven 会在当前目录中查找 POM，读取 POM，获取所需的配置信息，然后执行目标。

POM 中可以指定以下配置等等：
- 项目配置
- 项目版本
- 依赖管理
- 插件管理
- 版本管理
- 构建设置

所有 POM 文件一般都需要 project 根元素和三个必需字段：`groupId，artifactId，version`。

- `project`	工程的根标签。
- `modelVersion` 模型版本需要设置为 4.0，这是必须的，而且不会更改。
- `groupId`	这是工程组的标识。它在一个组织或者项目中通常是唯一的。 例如，一个百度项目 com.baidu.project-group 拥有所有的和百度相关的项目。
- `artifactId` 这是工程的标识，它通常是工程的名称。 例如，百度搜索 baidu-search。
- `version`	这是工程的版本号。

## 3.Maven 依赖管理
### 3.1 依赖导入
比如说，我们现在需要导入一个专门处理 JSON 字符串的依赖。

我们只需要知道，你所要导入的工具包的 groupId 、artifactId 、version 这三个标签的信息就可以了。

因为一个真正的项目中，依赖绝不止一个，所以在 pom.xml 就用了依赖的英文单词的复数形式来管理依赖信息，具体格式如下：
```xml
<project>
    ...
  <dependencies>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.75</version>
    </dependency>
      ...
      ...
      可添加多个依赖
      ...
      ...
  </dependencies>
    ...
</project>
```

### 3.2 依赖原理
为什么上边知道 groupId 、artifactId 、version 这三个信息 maven 就能自动管理这个依赖了，其实原理很简单。

如果你引入了依赖，maven 就会使用这个依赖的信息拼接字符串，到 maven 的中央仓库去寻找这个依赖，并把它下载下来。

默认下载是下载到了用户的根目录下，也就是 ~/.m2/repository 这个目录中，我们也称这个目录为本地仓库。

maven 中央仓库的地址是： [https://repo.maven.apache.org/maven2/](https://repo.maven.apache.org/maven2/)

maven 拼接字符串的格式：仓库地址/{groupId}/{artifactId}/{version}/{artifactId}-{version}.jar

注意：groupId 需要把所包含的所有点替换成斜杠

如果是导入上边的 fastjson ，那么这个依赖在 maven 中央仓库的地址也就是：
```text
https://repo.maven.apache.org/maven2/com/alibaba/fastjson/1.2.75/fastjson-1.2.75.jar
```

这个地址是一个网络地址，你可以把它复制到浏览器地址栏中，然后回车访问一下，这个依赖就能下载下来了。

也有可能你并不能访问，因为 maven 的中央仓库是在外网，在国内访问会很慢，甚至打不开等情况。

### 3.3 更换仓库
为了解决这些不稳定的情况，国内很多知名的大公司，比如：阿里，它们就自己创建了一个仓库，相当是把 maven 中央仓库里边所有的依赖全部拷到了他们自己的仓库中，并实时更新，同时，向国人也开放了这个仓库的地址，也就是 阿里的maven库 。

现在，maven 默认是从中央仓库去下载，我们想要改变它，就必须告诉他，说你不要去找中央仓库了，太慢了，你去阿里的 maven 库下载吧，既然要告诉他，我们就需要配置一下远程仓库地址。

找到解压后的 maven 目录，进入 conf 目录，找到 settings 文件，在里边找到 mirrors 节点，替换成以下信息：
```xml
<mirrors>
  <mirror>
    <id>alimaven</id>
    <mirrorOf>central</mirrorOf>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  </mirror>
</mirrors>
```

同时，因为 maven 默认使用的 JDK 编译版本为 JDK1.5，显然也并不符合我们的要求。

我们需要重新指定版本，只需要找到 profiles 节点，替换成以下信息即可：
```xml
<profiles>
  <profile>
    <id>jdk1.8</id>
    <activation>
      <activeByDefault>true</activeByDefault>
      <jdk>1.8</jdk>
    </activation>
    <properties>
      <maven.compiler.source>1.8</maven.compiler.source>
      <maven.compiler.target>1.8</maven.compiler.target>
      <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
    </properties>
  </profile>
</profiles>
```

好了，现在仓库地址也更改了，那当他下载 fastjson 依赖的时候，下载地址就应该是：
```text
http://maven.aliyun.com/nexus/content/groups/public/com/alibaba/fastjson/1.2.75/fastjson-1.2.75.jar
```

为了验证，你也可以把这个地址粘贴到浏览器中，回车，看看它会不会下载。

### 3.4 内心疑问
你怎么知道 `groupId 、artifactId 、version` 这三个标签的信息？

我们给大家一个网站： [https://mvnrepository.com/](https://mvnrepository.com/)

我们就以 fastjson 为例，为大家进行演示

![](https://czxcab.cn/file/docs/maven7.jpg)
![](https://czxcab.cn/file/docs/maven8.jpg)
![](https://czxcab.cn/file/docs/maven9.jpg)
![](https://czxcab.cn/file/docs/maven10.jpg)

### 3.5 依赖范围
- 一个依赖是有自己的作用范围的，一般主要有以下几种情况：
  - compile 范围依赖：
  - 对主程序是否有效：有效
  - 对测试程序是否有效：有效
  - 是否参与打包：参与
  - 是否参与部署：参与
  - 典型例子：spring-core

- test 范围依赖：
  - 对主程序是否有效：无效
  - 对测试程序是否有效：有效
  - 是否参与打包：不参与
  - 是否参与部署：不参与
  - 典型例子：junit
- provided 范围依赖：
  - 对主程序是否有效：有效
  - 对测试程序是否有效：有效
  - 是否参与打包：不参与
  - 是否参与部署：不参与
  - 典型例子：servlet-api

如何设置一个依赖的作用范围，请参考：
```xml
<dependency>
	<groupId>com.alibaba</groupId>
	<artifactId>fastjson</artifactId>
	<version>1.2.75</version>
	<!-- 设置依赖范围，主要可取值：compile、test、provided，默认不配就是compile  -->
	<scope>compile</scope>
</dependency>
```

### 3.6 依赖的传递性
假设，现在有一个 Hello 项目，它导入了 spring-core 依赖，而开发 spring-core 需要依赖 commons-logging 依赖；

还存在另外一个项目 HelloFriend 他依赖了 Hello 项目，关系如图所示：
![](https://czxcab.cn/file/docs/maven11.jpg)

依赖的传递有什么好处？

可以传递的依赖不必在每个模块工程中都重复声明，在 “最下面” 的工程中依赖一次即可。

### 3.7 依赖的排除
假设，现在 commons-logging 这个依赖包是有问题的包，我不想继续使用了，该如何排除呢？
![](https://czxcab.cn/file/docs/maven12.jpg)

这里有一份参考代码，可以参考：

在 HelloFriend 工程的 pom.xml 文件的 dependencies 标签内写入以下代码
```xml
<dependency>
	<groupId>com.hello</groupId>
	<artifactId>hello</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<!-- 用来排除不想要的依赖包 -->
	<exclusions>
		<exclusion>
			<groupId>commons-logging</groupId>
			<artifactId>commons-logging</artifactId>
		</exclusion>
	</exclusions>
</dependency>
```

### 3.8 依赖的原则
依赖的原则：它是为了解决工程模块之间的 jar 包冲突的问题的，我们无法设置，maven 有默认的原则，我们需要了解。

- 原则一：路径最短者优先
  ![](https://czxcab.cn/file/docs/maven13.jpg)

- 原则二：验证路径相同时，先声明者优先
  ![](https://czxcab.cn/file/docs/maven14.jpg)

### 3.9 依赖的继承
由于非 compile 范围的依赖信息是不能在 “依赖链” 中传递的，所以有需要的工程只能单独配置。例如：
```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.0</version>
    <scope>test</scope>
</dependency>
```

此时如果项目需要将各个模块的 junit 版本统一为 4.9，那么到各个工程中手动修改无疑是非常不可取的。

使用继承机制就可以将这样的依赖信息统一提取到父工程模块中进行统一管理。

创建父工程和创建一般的 Java 工程操作一致，唯一需要注意的是：打包方式处要设置为 pom。

而在子工程中只需要引入父工程的工程坐标就可以了。

```xml
<parent>
    <!-- 父工程坐标 -->
    <groupId>...</groupId>
    <artifactId>Parent</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <!-- 指定从当前子工程的pom.xml文件出发，查找父工程的pom.xml的路径 -->
    <relativePath>../Parent/pom.xml</relativePath>
</parent>
```

此时如果子工程的 `groupId` 和 `version` 和父工程重复则可以删除。

将 Parent 项目中的 `dependencies` 标签，用 `dependencyManagement` 标签括起来。

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.9</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

在子项目中重新指定需要的依赖，删除范围和版本号，因为父工程中已经指定了。
```xml
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
    </dependency>
</dependencies>
```

## 4.Maven 常用命令
### 4.1 清理项目
```shell
mvn clean
```

### 4.2 编译主程序
```shell
mvn compile
```

### 4.3 编译测试程序
```shell
mvn test-compile
```

### 4.4 执行主程序
```shell
首先需要编译 Java工程：mvn compile
不存在参数的情况下运行：mvn exec:java -Dexec.mainClass="主程序入口类，不需要拓展名"
在存在参数的情况下运行：mvn exec:java -Dexec.mainClass="主程序入口类，不需要拓展名" -Dexec.args="arg0 arg1 arg2"
```

### 4.5 执行测试
```shell
mvn test
```

### 4.6 打包项目
正常打包：
```shell
mvn package
```
跳过测试：
```shell
mvn package -Dmaven.test.skip=true
```
### 4.7 安装项目
正常安装：
```shell
mvn install
```
跳过测试：
```shell
mvn install -Dmaven.test.skip=true
```
### 4.8 部署项目
正常部署：
```shell
mvn deploy
```
跳过测试：
```shell
mvn deploy -Dmaven.test.skip=true
```

### 4.9 生成站点
```shell
mvn site
```

### 4.10 查看版本
```shell
mvn -v
```

### 4.11 依赖管理

打印出已解决依赖的列表：
```shell
mvn dependency:resolve
```
打印出所有的依赖的列表：
```shell
mvn dependency:tree
```

### 4.12 创建项目
```shell
创建 Maven 版本的 Java 项目：

#创建Maven版本的Java项目
mvn  archetype:generate  -DgroupId=packageName  -DartifactId=appName  -Dversion=1.0-SNAPSHOT  -DarchetypeArtifactId=maven-archetype-quickstart  -DinteractiveMode=false

#编译此项目
mvn  compile

#执行此项目
mvn  exec:java  -Dexec.mainClass="packageName.App"   
```

创建 Maven 版本的 JavaWeb 项目：
```shell
mvn  archetype:generate  -DgroupId=packageName  -DartifactId=webappName  -Dversion=1.0-SNAPSHOT  -DarchetypeArtifactId=maven-archetype-webapp  -DinteractiveMode=false   
```


### 4.13 项目转化
将项目转化为 Eclipse 项目 :
```shell
mvn  eclipse:eclipse   
```

将项目转化为 Idea 项目 :
```shell
mvn  idea:idea   
```

### 4.14 配置清除
清除所有 Eclipse 的工程配置文件：
```shell
mvn  eclipse:clean   
```

清除所有 Idea 的工程配置文件：
```shell
mvn  idea:clean   
```

## 5.Maven 生命周期
::: warning 注意
以下是一个简略版的生命周期，足够我们学习了
:::

- 清理：删除以前的编译结果，为重新编译做好准备。
- 编译：将 Java 源程序编译为字节码文件。
- 测试：针对项目中的关键点进行测试，确保项目在迭代开发过程中关键点的正确性，在每次测试后以标准格式记录和展示测试结果。
- 打包：将一个包含诸多文件的工程封装为一个压缩文件用于安装或部署。Java 工程对应 jar 包，Web 工程对应 war 包。
- 安装：在 Maven 环境下特指将打包的结果（jar 包或 war 包）安装到本地仓库中。
- 发布：将打包的结果部署到远程仓库或将 war 包部署到服务器上运行。

![](https://czxcab.cn/file/docs/maven15.jpg)

当执行 `compile` 的时候，会执行从左向右依次执行 compile

当执行 `test` 的时候，会执行从左向右依次执行 compile、test

当执行 `package` 的时候，会执行从左向右依次执行 compile、test、package

当执行 `install` 的时候，会执行从左向右依次执行 compile、test、package、install

当执行 `deploy` 的时候，会执行从左向右依次执行 compile、test、package、install、deploy

运行任何一个阶段的时候，它前面的所有阶段都会被运行，例如我们运行 mvn install 的时候，代码会被 编译，测试，打包。

这就是 Maven 为什么能够自动执行构建过程的各个环节的原因。

## 6.Maven 插件管理
### 6.1 插件概述
Maven 的核心仅仅定义了抽象的生命周期，具体的任务都是交由插件完成的。

每个插件都能实现多个功能，每个功能就是一个插件目标。

Maven 的生命周期与插件目标相互绑定，以完成某个具体的构建任务。

例如：compile 就是插件 maven-compiler-plugin 的一个目标

Maven 有以下三个标准的生命周期：

- `clean`：项目清理的处理
- `default` 或 `build`：项目部署的处理
- `site`：项目站点文档创建的处理（一般不用，所以生命周期没提）
每个生命周期中都包含着一系列的阶段。

这些阶段就相当于 Maven 提供的统一的接口，然后这些阶段的实现由 Maven 的插件来完成。

我们在输入 mvn 命令的时候 比如 `mvn clean`，clean 对应的就是 Clean 生命周期中的 clean 阶段。

但是 `clean` 的具体操作是由 `maven-clean-plugin` （内置了，不用我们手动添加）来实现的。

所以说 Maven 生命周期的每一个阶段的具体实现都是由 Maven 插件实现的。

Maven 实际上是一个依赖插件执行的框架，每个任务实际上是由插件完成。

Maven 插件通常被用来：

- 创建 jar 文件
- 创建 war 文件
- 编译代码文件
- 代码单元测试
- 创建工程文档
- 创建工程报告

Maven 提供了下面两种类型的插件：
- `Build plugins` 在构建时执行，并在 pom.xml 的元素中配置。（最常用）
- `Reporting plugins` 在网站生成过程中执行，并在 pom.xml 的元素中配置。（不常用）

一定注意，maven 默认会采用自身所定义的插件来执行各个阶段，也就是说，即使你不配置这些插件，它也能够正常运行。

但是，你要是配置了某一阶段的一个插件，他就会采用你所配置的插件来进行运行。

除了一些不在生命周期内的插件，而我们需要使用，则需要单独配置，接下里就会告诉大家有哪些常见插件。

### 6.2 插件配置
我们接下来主要讲解在工程 POM.XML 文件中如何配置一个插件？

找到 POM.XML 在根标签内添加以下代码，插件名和版本仅供参考，具体添加什么插件，取决于你。
```xml
<build>
	<plugins>
		<!-- 编译插件 -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>3.2</version>
			<configuration>
				<source>1.8</source>
				<target>1.8</target>
				<encoding>UTF-8</encoding>
			</configuration>
		</plugin>
        ...
        ...
	</plugins>
</build>
```

### 6.3常用插件
`maven-resources-plugin`插件描述：该插件处理项目的资源文件拷贝到输出目录，可以分别处理 main resources 和 test resources。
```xml
<build>
	<plugins>
		<!-- 依赖插件 -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-resources-plugin</artifactId>
			<version>3.0.1</version>
			<configuration>
				<encoding>UTF-8</encoding>
			</configuration>
		</plugin>
	</plugins>
</build>
```
除了使用 maven-resources-plugin 也可以使用以下配置来进行资源拷贝：
```xml
<build>
	<resources>
		<resource>
			<directory>src/main/java</directory>
			<includes>
				<include>**/*.properties</include>
				<include>**/*.xml</include>
				<include>**/*.conf</include>
			</includes>
			<filtering>false</filtering>
		</resource>
		<resource>
			<directory>src/main/resources</directory>
			<includes>
				<include>**/*.properties</include>
				<include>**/*.xml</include>
				<include>**/*.conf</include>
			</includes>
			<filtering>false</filtering>
		</resource>
	</resources>
</build>
```

`maven-assembly-plugin` 插件描述：该插件允许用户整合项目的输出，包括依赖、模块、网站文档和其他文档到一个单独的文件，即可用定制化打包。

四种预定义的描述器可用：bin, jar-with-dependencies, src, project。
```xml
<build>
	<plugins>
        <!-- 依赖插件 -->
		<plugin>
			<artifactId>maven-assembly-plugin</artifactId>
			<configuration>
				<descriptorRefs>
					<descriptorRef>jar-with-dependencies</descriptorRef>
				</descriptorRefs>
				<archive>
					<manifest>
						<mainClass>主程序类全路径</mainClass>
					</manifest>
				</archive>
			</configuration>
			<executions>
				<execution>
					<id>make-assembly</id>
					<phase>package</phase>
					<goals>
						<goal>single</goal>
					</goals>
				</execution>
			</executions>
		</plugin>
	</plugins>
</build>
```

`maven-source-plugin` 插件描述：该插件处理打包项目的源代码。
```xml
<build>
	<plugins>
		<!-- 依赖插件 -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-source-plugin</artifactId>
			<executions>
				<execution>
					<id>attach-sources</id>
					<goals>
						<goal>jar</goal>
					</goals>
				</execution>
			</executions>
		</plugin>
	</plugins>
</build>
```

`maven-dependency-plugin` 插件描述：自动拷贝 jar 包到 target 目录
```xml
<build>
	<plugins>
		<!-- 依赖插件 -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-dependency-plugin</artifactId>
			<version>2.6</version>
			<executions>
				<execution>
					<id>copy-dependencies</id>
					<phase>compile</phase>
					<goals>
						<goal>copy-dependencies</goal>
					</goals>
					<configuration>
						<!-- ${project.build.directory}为Maven内置变量，缺省为target -->
						<outputDirectory>${project.build.directory}/lib</outputDirectory>
						<!-- 表示是否不包含间接依赖的包 -->
						<excludeTransitive>false</excludeTransitive>
						<!-- 表示复制的jar文件去掉版本信息 -->
						<stripVersion>true</stripVersion>
					</configuration>
				</execution>
			</executions>
		</plugin>
	</plugins>
</build>
```

## 7.Maven 变量信息
### 7.1 内置变量
主要有两个常用内置属性：${basedir}项目的根目录 (包含 pom.xml 文件的目录)，${version}项目版本
```text
#用户可以使用该属性引用POM文件中对应元素的值，常用的POM属性包括：
${project.build.sourceDirectory}：项目的主源码目录，默认为 src/main/java
${project.build.testSourceDirectory}：项目的测试源码目录，默认为 src/test/java
${project.build.directory}：项目构件输出目录，默认为 target/
${project.outputDirectory}：项目主代码编译输出目录，默认为 target/classes/
${project.testOutputDirectory}：项目测试代码编译输出目录，默认为 target/test-classes/
${project.groupId}：项目的 groupId
${project.artifactId}：项目的 artifactId
${project.version}：项目的 version，与${version}等价
${project.build.fianlName}：项目打包输出文件的名称,默认为${project.artifactId}-${project.version}

#获取环境变量属性，所有环境变量都可以使用以env.开头的Maven属性引用
${env.xxx}：获取系统环境变量

#获取Settings属性，用户使用settings.开头的属性引用 settings.xml 文件中XML元素的值
${settings.xxx}：获取settings.xml中对应元素的值
```
### 7.2 自定义变量
如何定义
```xml
<project>
    ...
    <properties>
        <变量名>变量值</变量名>
    </properties>
    ...
</project>
```

如何引用
```text
${变量名}
```

案例演示
```xml
<project>
    ...
    <properties>
		<junit.version>3.8.1</junit.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>${junit.version}</version>
			<scope>test</scope>
		</dependency>
	</dependencies>
    ...
</project>
```

## 8.Maven 私服搭建
### 8.1 nexus3 介绍
Nexus3 是一个仓库管理器，它极大地简化了本地内部仓库的维护和外部仓库的访问。

平常我们在获取 maven 仓库资源的时候，都是从 maven 的官方（或者国内的镜像）获取，但是这都不是最好的方案，假如在同一个环境内，一个团队的多个开发人员同样的依赖都要从远程获取一遍，从网络方面来说，这是非常耗时的。这时候就需要在局域网内部署一个 Nexus3 用来管理 Maven（apt、yum、gradle、pypi、docker 等等）仓库。

有些公司都不提供外网给项目组人员，因此就不能使用 maven 访问远程的仓库地址，所以很有必要在局域网里找一台有外网权限的机器，搭建 Nexus3 私服，然后开发人员连到这台私服上，这样的话就可以通过这台搭建了 Nexus3 私服的电脑访问 maven 的远程仓库。

![](https://czxcab.cn/file/docs/maven16.jpg)

### 8.2 nexus3 搭建
下载地址：[https://www.sonatype.com/nexus/repository-oss/download](https://www.sonatype.com/nexus/repository-oss/download)

首先先下载下来 Nexus，然后解压到一个没有空格，没有中文的目录中去。

- nexus-3.59.0-01这个文件夹放的是nexus服务器相关的文件
- sonatyp-work这个文件夹放的是nexus工作的数据文件,上传下载的jar包等都会放在这里

![](https://czxcab.cn/file/docs/maven17.jpg)

找到nexus-3.59.0-01文件夹下的bin目录在bin文件夹下输入cmd打开命令行，并执行`nexus.exe /run`命令，启动nexus服务器。 下面这样就是启动成功了

![](https://czxcab.cn/file/docs/maven18.jpg)

打开浏览器：访问[http://127.0.0.1:8081/](http://127.0.0.1:8081/)进入nexus管理界面，然后点击右上角sign in进行登录，默认的用户名是`admin`，密码是`sonatype-work/nexus3`文件夹下的`admin.password`文件。

![](https://czxcab.cn/file/docs/maven19.jpg)
![](https://czxcab.cn/file/docs/maven20.jpg)

登录后会让你重新设置密码，然后会有几步指引操作，完成后就可以进入nexus管理界面了。

Nexus 有 3 个类型的数据仓库，分别是 `hosted`，`proxy`，`group`。

- `hosted` 宿主仓库：主要用于部署无法从公共仓库获取的构件以及自己或第三方的项目构件； 
- `proxy` 代理仓库：代理公共的远程仓库； 
- `group` 仓库组：Nexus 通过仓库组统一管理多个仓库，这样我们在项目中直接请求仓库组即可请求到仓库组管理的多个仓库。

Nexus 预定义了 2 个本地仓库，分别是 `maven-releases`, `maven-snapshots`。

- `maven-releases`：这里存放我们自己项目中发布的构建，通常是 Release 版本的，也就是正式版。 
- `maven-snapshots`：这个仓库非常的有用，它的目的是让我们可以发布那些非 release 版本，非稳定版本，也就是快照版。

![](https://czxcab.cn/file/docs/maven21.jpg)

怎么上传jar包到nexus，这里上传一个jar作为演示。

![](https://czxcab.cn/file/docs/maven22.jpg)
![](https://czxcab.cn/file/docs/maven23.jpg)
![](https://czxcab.cn/file/docs/maven24.jpg)
![](https://czxcab.cn/file/docs/maven25.jpg)

这样一个jar包就上传到nexus了

### 8.3 create 仓库
如果你的工程中，使用的 jar 包，在私服中没有，他就会自动连接远程仓库进行下载，这不是我们希望的结果，我们希望它去阿里 maven 库去下载，这样下载速度会更快。

![](https://czxcab.cn/file/docs/maven26.jpg)
![](https://czxcab.cn/file/docs/maven27.jpg)
![](https://czxcab.cn/file/docs/maven28.jpg)

阿里仓库地址：http://maven.aliyun.com/nexus/content/groups/public/

填写完后拉到最下面，点击创建就行了。然后我们需要配置group仓库，让私服去连接阿里仓库。

![](https://czxcab.cn/file/docs/maven29.jpg)
![](https://czxcab.cn/file/docs/maven30.jpg)
![](https://czxcab.cn/file/docs/maven31.jpg)

### 8.4 maven 配置
老规矩，要配置 maven，就需要到 maven 安装目录中的 conf/settings.xml

上传需要的设置：
```xml
<servers>
  <!-- 发布版 -->
  <server>
    <id>releases</id>
    <username>admin</username>
    <password>password</password>
  </server>
  <!-- 快照版 -->
  <server>
    <id>snapshots</id>
    <username>admin</username>
    <password>password</password>
  </server>
</servers>
```

下载需要的设置
```xml
<mirrors>
  <mirror>
    <id>nexus</id>
    <mirrorOf>*</mirrorOf>
    <name>nexus maven</name>
    <url>http://127.0.0.1:8081/repository/maven-public/</url>
  </mirror>
</mirrors>
```

### 8.5 project 配置
我们准备一个 maven 项目，在 pom.xml 中添加一段配置：
- `repositorie` 表示下载项目依赖库文件的maven仓库地址
  ```xml
    <repositories>
    <repository>
        <!-- 仓库ID -->
        <id>nexus</id>
        <!-- 仓库名称 -->
        <name>Nexus</name>
        <!-- 仓库地址 -->
        <url>http://127.0.0.1:8081/repository/maven-public/</url>
        <!-- 仓库中版本为releases的构件 -->
        <releases>
            <!-- 是否支持更新-->
            <enabled>true</enabled>
            <!-- 构件更新的策略，可选值有daily, always, never, interval:X(其中的X是一个数字，表示间隔的时间，单位min)，默认为daily-->
            <updatePolicy>always</updatePolicy>  
            <!-- 校验码异常的策略，可选值有ignore, fail, warn -->
            <checksumPolicy>warn</checksumPolicy>  
        </releases>
         <!-- 仓库版本为snapshots的构件-->
        <snapshots>
             <!-- 是否支持更新-->
            <enabled>true</enabled>  
            <!-- 同上 -->
            <updatePolicy>always</updatePolicy>  
            <!-- 同上 -->
            <checksumPolicy>warn</checksumPolicy>  
        </snapshots>
    </repository>
  </repositories>
  ```

- `distributionManagement` 表示项目打包成库文件后要上传到仓库地址
  ```xml
  <distributionManagement>
    <repository>
        <id>releases</id>
        <name>maven-releases</name>
        <url>http://127.0.0.1:8081/repository/maven-releases/</url>
        <uniqueVersion>true</uniqueVersion>
        <layout>default</layout>
    </repository>
    <snapshotRepository>
        <id>snapshots</id>
        <name>maven-snapshots</name>
        <url>http://127.0.0.1:8081/repository/maven-snapshots/</url>
        <uniqueVersion>true</uniqueVersion>
        <layout>legacy</layout>
    </snapshotRepository>
  </distributionManagement>
  ```

如果是公司本地仓库，而且需要认证才能访问，需要在本地maven的conf\settings.xml文件中添加上面说到的上传需要的设置。

::: warning 注意
`<repository>`节点下的`<id>`对应setting.xml文件中的`<server>`的`<id>`
:::

### 8.6 发布项目到私服
只要执行命令 mvn deploy即可。

这里配置了两个仓库，一个正式版、一个快照版，maven 是如何区分你要发布到哪一个仓库呢？

如果你的版本带着 releases，也就是 <version>0.0.1-releases</version>，就会发布到 maven-releases。

如果你的版本带着 snapshots，也就是 <version>0.0.1-snapshots</version>，就会发布到 maven-snapshots。
