import{_ as e,r as t,o as l,c as i,a as n,b as s,d as p,w as c,e as r}from"./app-CzSBTTj3.js";const o={},d=r(`<h2 id="frp概述" tabindex="-1"><a class="header-anchor" href="#frp概述"><span>frp概述</span></a></h2><blockquote><p>frp 是一个高性能的反向代理应用，可以帮助您轻松地进行内网穿透，对外网提供服务，支持 tcp, http, https 等协议类型，并且 web 服务支持根据域名进行路由转发。frp 采用 C/S 模式，将服务端部署在具有公网 IP 机器上，客户端部署在内网或防火墙内的机器上，通过访问暴露在服务器上的端口，反向代理到处于内网的服务。 在此基础上，frp 支持 TCP, UDP, HTTP, HTTPS 等多种协议，提供了加密、压缩，身份认证，代理限速，负载均衡等众多能力。</p></blockquote><p>frp官网：https://gofrp.org/</p><p>GitHub地址：https://github.com/fatedier/frp</p><h2 id="下载frp" tabindex="-1"><a class="header-anchor" href="#下载frp"><span>下载frp</span></a></h2><blockquote><p>由于frp是go语言开发，因此可以直接下载可执行程序，没有任何依赖。一般通过GitHub的releases下载：https://github.com/fatedier/frp/releases</p></blockquote><p>可以选择linux版本和windows版本</p><p><img src="https://czxcab.cn/file/docs/frp1.jpg" alt="图片"></p><h2 id="frp安装" tabindex="-1"><a class="header-anchor" href="#frp安装"><span>frp安装</span></a></h2><h3 id="服务器端-接口请求的" tabindex="-1"><a class="header-anchor" href="#服务器端-接口请求的"><span>服务器端(接口请求的)</span></a></h3><div class="custom-container tip"><p class="custom-container-title">首先你得有个拥有公网ip的服务器，这里我使用的是云服务器</p></div><ol><li>首先把下载的压缩包上传到云服务器上</li></ol><p><img src="https://czxcab.cn/file/docs/frp2.jpg" alt="图片"></p><ol start="2"><li>修改文件权限</li></ol><blockquote><p>不修改文件权限会包错，我这里图方便，所以直接全部设置成777了</p></blockquote><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>chmod 777 /mydata/frp/frps
chmod 777 /mydata/frp/frps.ini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>修改配置文件frps.ini</li></ol><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code>[common]
<span class="token comment"># 这个默认端口是7000，就是客户端和服务端通信的，不是你转发的那个端口</span>
<span class="token comment"># 如果这个要改了，客户端的7000也要改成和这里一样。</span>
<span class="token key attr-name">bind_port</span> <span class="token punctuation">=</span> <span class="token value attr-value">6660</span>

<span class="token comment"># 这个是frp的web管理控制台的用户名密码和登录端口</span>
<span class="token key attr-name">dashboard_user</span> <span class="token punctuation">=</span> <span class="token value attr-value">admin</span>
<span class="token key attr-name">dashboard_pwd</span> <span class="token punctuation">=</span> <span class="token value attr-value">admin</span>
<span class="token key attr-name">dashboard_port</span> <span class="token punctuation">=</span> <span class="token value attr-value">6661</span>

<span class="token comment"># 这个token之后在客户端会用到，相当于客户端登录服务器端，毕竟这个东西不能随便给人用，自己随便输入一串字符串就行</span>
<span class="token key attr-name">token</span> <span class="token punctuation">=</span> <span class="token value attr-value">wertyoqazxcvbnjhgfcvbn</span>

<span class="token comment"># 心跳连接：必须得有，frp 0.43.0版本如果不加，60秒就会自动断开连接！</span>
<span class="token comment"># 服务器就加这一条，客户机每台都要加。</span>
<span class="token key attr-name">heartbeat_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>运行frpsc</li></ol><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>./frps -c frps.ini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://czxcab.cn/file/docs/frp3.jpg" alt="图片"></p><p>出现【Start frps success】代表运行成功，此时访问 x.x.x.x:7500 并使用自己设置的用户名密码登录，即可看到仪表板界面，如果不能看到，但是确实启动成功了，请去自己买的云服务器里开放端口。</p><p><img src="https://czxcab.cn/file/docs/frp4.jpg" alt="图片"></p><div class="custom-container warning"><p class="custom-container-title">至此，我们的服务端仅运行在前台，但是Ctrl+C停止或者关闭SSH窗口后，frps 均会停止运行，所以进行如下配置</p></div><p>配置systemctl进行开机启动</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">vim</span> /lib/systemd/system/frpc.service

<span class="token comment"># 在frps.service里添加以下内容</span>
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>frps <span class="token function">service</span>
<span class="token assign-left variable">After</span><span class="token operator">=</span>network.target syslog.target
<span class="token assign-left variable">Wants</span><span class="token operator">=</span>network.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple
<span class="token comment"># 启动服务的命令（此处写你的frps的实际安装目录）</span>
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/mydata/frp/frps <span class="token parameter variable">-c</span> /mydata/frp/frps.ini

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>systemctl常用命令</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#启动 </span>
<span class="token function">sudo</span> systemctl start frpc  
<span class="token comment">#关闭 </span>
<span class="token function">sudo</span> systemctl stop frpc 
<span class="token comment">#重启 </span>
<span class="token function">sudo</span> systemctl restart frpc 
<span class="token comment">#查看状态 </span>
<span class="token function">sudo</span> systemctl status frpc 
设置开机自动启动
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> frpc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="客户端-存储文件的" tabindex="-1"><a class="header-anchor" href="#客户端-存储文件的"><span>客户端(存储文件的)</span></a></h3><ol><li>首先把下载的压缩包解压，复制到文件夹下</li></ol><p><img src="https://czxcab.cn/file/docs/frp5.jpg" alt="图片"></p><ol start="2"><li>修改配置文件frpc.ini</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>common<span class="token punctuation">]</span>
<span class="token comment"># 你frp服务器的公网ip地址</span>
server_addr <span class="token operator">=</span> <span class="token number">43.138</span>.186.55
server_port <span class="token operator">=</span> <span class="token number">6660</span>
<span class="token comment"># token与frps.ini 相同</span>
token <span class="token operator">=</span> wertyoqazxcvbnjhgfcvbn

<span class="token comment"># 这里取名随意,一般有意义就行,一个标签指定一个端口</span>
<span class="token punctuation">[</span>minio<span class="token punctuation">]</span>
<span class="token comment"># 穿透协议类型，可选：tcp，udp，http，https，stcp，xtcp，这个设置之前必须自行搞清楚应该是什么</span>
<span class="token builtin class-name">type</span> <span class="token operator">=</span> tcp
<span class="token comment"># 你当前内网服务器的网卡IP地址，不要用127.0.0.1</span>
local_ip <span class="token operator">=</span> <span class="token number">0.0</span>.0.0
<span class="token comment"># 你要转发的服务端口</span>
local_port <span class="token operator">=</span> <span class="token number">9000</span>
<span class="token comment"># 你要映射到公网上的那个端口</span>
remote_port <span class="token operator">=</span> <span class="token number">9000</span>
<span class="token comment"># 服务器与客户机之间的心跳连接：如果没有，每隔60秒就会自动断开连接！！！</span>
heartbeat_timeout <span class="token operator">=</span> <span class="token number">30</span>

<span class="token comment"># 可以有多个标签</span>
<span class="token punctuation">[</span>nacos<span class="token punctuation">]</span>
<span class="token builtin class-name">type</span> <span class="token operator">=</span> tcp
local_ip <span class="token operator">=</span> <span class="token number">0.0</span>.0.0
local_port <span class="token operator">=</span> <span class="token number">8848</span>
remote_port <span class="token operator">=</span> <span class="token number">8848</span>
heartbeat_timeout <span class="token operator">=</span> <span class="token number">30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>运行frpc</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>frpc.exe <span class="token parameter variable">-c</span> frpc.ini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://czxcab.cn/file/docs/frp6.jpg" alt="图片"></p><p>这个时候打开fpr服务器端界面就可以确认是否成功了</p>`,37),u={class:"custom-container tip"},m=n("p",{class:"custom-container-title"},"TIP",-1);function v(b,k){const a=t("RouteLink");return l(),i("div",null,[d,n("div",u,[m,n("p",null,[s("如果你觉得这个窗口太占位置，可以看"),p(a,{to:"/docs/technicalDocument/%E9%83%A8%E7%BD%B2%E7%9B%B8%E5%85%B3/Windows%E7%B3%BB%E7%BB%9F%E5%90%8E%E5%8F%B0%E8%BF%90%E8%A1%8C%E6%9C%8D%E5%8A%A1.html"},{default:c(()=>[s("Windows系统后台运行服务")]),_:1}),s("这篇文章，把frpc放到后台运行")])])])}const h=e(o,[["render",v],["__file","frp内网穿透.html.vue"]]),g=JSON.parse('{"path":"/docs/technicalDocument/%E9%83%A8%E7%BD%B2%E7%9B%B8%E5%85%B3/frp%E5%86%85%E7%BD%91%E7%A9%BF%E9%80%8F.html","title":"frp内网穿透","lang":"zh-CN","frontmatter":{"title":"frp内网穿透"},"headers":[{"level":2,"title":"frp概述","slug":"frp概述","link":"#frp概述","children":[]},{"level":2,"title":"下载frp","slug":"下载frp","link":"#下载frp","children":[]},{"level":2,"title":"frp安装","slug":"frp安装","link":"#frp安装","children":[{"level":3,"title":"服务器端(接口请求的)","slug":"服务器端-接口请求的","link":"#服务器端-接口请求的","children":[]},{"level":3,"title":"客户端(存储文件的)","slug":"客户端-存储文件的","link":"#客户端-存储文件的","children":[]}]}],"git":{"updatedTime":1715061248000,"contributors":[{"name":"czx","email":"2504058202@qq.com","commits":1}]},"filePathRelative":"docs/technicalDocument/部署相关/frp内网穿透.md"}');export{h as comp,g as data};
