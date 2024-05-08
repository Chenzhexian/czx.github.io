import{_ as e,r as l,o as i,c as t,a as c,b as s,d as p,w as o,e as n}from"./app-BoIshBAq.js";const r={},d=n(`<h2 id="备份" tabindex="-1"><a class="header-anchor" href="#备份"><span>备份</span></a></h2><h3 id="全量备份" tabindex="-1"><a class="header-anchor" href="#全量备份"><span>全量备份</span></a></h3><h4 id="shell脚本" tabindex="-1"><a class="header-anchor" href="#shell脚本"><span>shell脚本</span></a></h4><p>自己写了个shell脚本，用于备份mysql数据库，使用mysqldump命令，备份到指定目录。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#dir是备份文件要保存到的位置</span>
<span class="token assign-left variable">dir</span><span class="token operator">=</span><span class="token string">&quot;/czx_test/mysqlbackup&quot;</span>
<span class="token comment">#数据库账号密码和要备份的数据库,多个库使用空格隔开</span>
<span class="token assign-left variable">mysqluser</span><span class="token operator">=</span><span class="token string">&quot;用户名&quot;</span>
<span class="token assign-left variable">mysqlpwd</span><span class="token operator">=</span><span class="token string">&quot;密码&quot;</span>
<span class="token assign-left variable">backupdatabases</span><span class="token operator">=</span><span class="token string">&quot;库名1 库名2 库名3&quot;</span>
<span class="token comment">#目标用户@目标地址:目标路径</span>
<span class="token assign-left variable">target</span><span class="token operator">=</span><span class="token string">&quot;root@192.168.5.232:/目标路径&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;<span class="token variable">$dir</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">$dir</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;创建文件夹成功&quot;</span>
<span class="token keyword">else</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;文件夹已经存在&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">#执行备份操作 --databases后可以填多个库空格隔开  --all-databases备份所有库</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span>mysqldump -u$mysqluser -p$mysqlpwd  --skip-opt --single-transaction <span class="token parameter variable">-q</span> <span class="token parameter variable">--databases</span> $backupdatabases<span class="token operator">|</span><span class="token function">gzip</span> <span class="token operator">&gt;</span> $dir/mysqlbackup_<span class="token punctuation">$(</span>date <span class="token string">&quot;+%Y-%m-%d&quot;</span><span class="token punctuation">)</span>.sql.gz<span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;数据库备份成功&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">scp</span> <span class="token parameter variable">-r</span> $dir $target<span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;传输成功&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="操作步骤" tabindex="-1"><a class="header-anchor" href="#操作步骤"><span>操作步骤</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#1.创建shell脚本  backup是脚本名</span>
<span class="token function">vim</span> backup.sh
<span class="token comment">#给脚本添加执行权限</span>
<span class="token function">chmod</span> +x backup.sh
<span class="token comment">#运行脚本 （当前目录下）</span>
./backup.sh
<span class="token comment">#运行成功后出现如图的文件，拷贝到需要的服务器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://czxcab.cn/file/docs/mysqlbackup1.jpg" alt=""></p><h3 id="增量备份" tabindex="-1"><a class="header-anchor" href="#增量备份"><span>增量备份</span></a></h3><p>修改mysql配置文件</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#1.修改mysql配置</span>
<span class="token function">vim</span> /etc/my.cnf

<span class="token comment">#2.配置文件[mysqld]下添加  </span>
<span class="token comment"># /czx_test/mysqlbinlog是文件夹，mysql_binlog是文件名</span>
log-bin<span class="token operator">=</span>/czx_test/mysqlbinlog/mysql_binlog
binlog_format <span class="token operator">=</span> MIXED
server-id<span class="token operator">=</span><span class="token number">1</span>

<span class="token comment"># 注意!!!!!!!  /czx_test/mysqlbinlog文件夹必须存在，并修改权限,</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /czx_test/mysqlbinlog
<span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql:mysql /czx_test/mysqlbinlog //mysql:mysql 第一用户，第二个用户组
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">755</span> /czx_test/mysqlbinlog

<span class="token comment">#然后重启mysql服务</span>
<span class="token function">service</span> mysqld restart

<span class="token comment">#如果重启失败，将配置文件log-bin改成</span>
log-bin<span class="token operator">=</span>mysql_binlog //这样binlog日志就会生成到配置文件中datadir的位置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="shell脚本-1" tabindex="-1"><a class="header-anchor" href="#shell脚本-1"><span>shell脚本</span></a></h4><p>该脚本针对log-bin不能指定文件位置时使用</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#要保存的位置</span>
<span class="token assign-left variable">dir</span><span class="token operator">=</span><span class="token string">&quot;/czx_test/mysqlbinlog&quot;</span>
<span class="token comment">#数据库密码</span>
<span class="token assign-left variable">mysqluser</span><span class="token operator">=</span><span class="token string">&quot;用户名&quot;</span>
<span class="token assign-left variable">mysqlpwd</span><span class="token operator">=</span><span class="token string">&quot;密码&quot;</span>
<span class="token assign-left variable">target</span><span class="token operator">=</span><span class="token string">&quot;root@192.168.5.232:/目标路径&quot;</span>

<span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">$dir</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">$dir</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;创建文件夹成功&quot;</span>
<span class="token comment">#执行日志刷新，生成最新日志</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span>mysqladmin -u$mysqluser -p$mysqlpwd flush-logs<span class="token variable">\`</span></span>
<span class="token comment">#拷贝日志到指定位置  /var/lib/mysql这个目录是mysql配置文件中的datadir</span>
<span class="token function">cp</span> <span class="token parameter variable">-rf</span> /var/lib/mysql/mysql_binlog.* <span class="token variable">$dir</span>

<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">scp</span> <span class="token parameter variable">-r</span> $dir $target<span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;传输成功&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>能指定bin-log的位置</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#数据库密码</span>
<span class="token assign-left variable">mysqluser</span><span class="token operator">=</span><span class="token string">&quot;用户名&quot;</span>
<span class="token assign-left variable">mysqlpwd</span><span class="token operator">=</span><span class="token string">&quot;密码&quot;</span>
<span class="token comment">#dir是binlog文件保存的位置，也就是mysql配置文件中bin-log设置的位置</span>
<span class="token assign-left variable">dir</span><span class="token operator">=</span><span class="token string">&quot;/czx_test/mysqlbinlog&quot;</span>
<span class="token assign-left variable">target</span><span class="token operator">=</span><span class="token string">&quot;root@192.168.5.232:/目标路径&quot;</span>

<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span>mysqladmin -u$mysqluser -p$mysqlpwd flush-logs<span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">scp</span> <span class="token parameter variable">-r</span> $dir $target<span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;传输成功&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="操作步骤-1" tabindex="-1"><a class="header-anchor" href="#操作步骤-1"><span>操作步骤</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#1.创建shell脚本  mysqlbinlog是脚本名</span>
<span class="token function">vim</span> mysqlbinlog.sh
<span class="token comment">#给脚本添加执行权限</span>
<span class="token function">chmod</span> +x mysqlbinlog.sh
<span class="token comment">#运行脚本 （当前目录下）</span>
./mysqlbinlog.sh
<span class="token comment">#运行成功后出现如图的文件，拷贝到需要的服务器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://czxcab.cn/file/docs/mysqlbackup2.jpg" alt=""></p><h2 id="还原" tabindex="-1"><a class="header-anchor" href="#还原"><span>还原</span></a></h2><h3 id="全量还原" tabindex="-1"><a class="header-anchor" href="#全量还原"><span>全量还原</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#先解压</span>
<span class="token function">gzip</span> <span class="token parameter variable">-d</span> 文件名
<span class="token comment">#然后执行sql</span>
mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-proot</span> <span class="token operator">&lt;</span> backup.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>补充</p><ol><li>从全备份中提取出该表的建表语句</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sed</span> -e<span class="token string">&#39;/./{H;$!d;}&#39;</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;x;/CREATE TABLE \`表名\`/!d;q&#39;</span> 全备库或导出的单库.sql <span class="token operator">&gt;</span> 表tt.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>提取该表的insert into语句,追加到上一个建库sql后</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;INSERT INTO \`表名\`&#39;</span> 全备库或导出的单库.sql <span class="token operator">&gt;&gt;</span>表tt.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="增量还原" tabindex="-1"><a class="header-anchor" href="#增量还原"><span>增量还原</span></a></h3>`,28),m=n(`<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># --start-position=&#39;13202&#39; 开始节点</span>
<span class="token comment"># --stop-position=&#39;13506&#39;  结束节点</span>
<span class="token comment"># --stop-datetime=&#39;2021-02-06 15:58:39&#39;  开始时间</span>
<span class="token comment"># --start-datetime=&#39;2021-02-06 15:58:39&#39;  结束时间</span>
<span class="token comment"># --database=数据库名 指定某个数据库的操作</span>
mysqlbinlog <span class="token parameter variable">--database</span><span class="token operator">=</span>数据库名 mysql_binlog.000001<span class="token operator">|</span>mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-proot</span>

<span class="token comment">#查看binlog文件</span>
mysqlbinlog --no-defaults --base64-output<span class="token operator">=</span>decode-rows <span class="token parameter variable">-v</span> mysql_binlog.000001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>如果发现有命令不存在的，请看下面指令</p></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#使用find找到该文件位置，比如mysqlbinlog命令不存在</span>
<span class="token builtin class-name">cd</span> /
<span class="token function">find</span> <span class="token parameter variable">-name</span> mysqlbinlog

<span class="token comment">#找到后,在/usr/local/bin中创建软连接</span>
<span class="token builtin class-name">cd</span> /usr/local/bin
<span class="token function">ln</span> <span class="token parameter variable">-s</span> 文件位置/mysqlbinlog mysqlbinlog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="crontab定时任务" tabindex="-1"><a class="header-anchor" href="#crontab定时任务"><span>crontab定时任务</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#crontab -l 查看所有定时任务</span>
<span class="token comment">#crontab -e 开始编辑定时任务</span>

<span class="token comment">#进入编辑后 使用全路径</span>
* * * * * 全路径/backup.sh
<span class="token comment">#时间规则如下</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://czxcab.cn/file/docs/mysqlbackup3.jpg" alt=""></p>`,6);function v(b,u){const a=l("RouteLink");return i(),t("div",null,[d,c("p",null,[s("binlog的具体用法可以看这篇文章："),p(a,{to:"/docs/knowledgeShard/mysqlbinlog%E7%9A%84%E4%BD%BF%E7%94%A8.html"},{default:o(()=>[s("mysqlbinlog的使用")]),_:1})]),m])}const h=e(r,[["render",v],["__file","数据库备份还原.html.vue"]]),g=JSON.parse('{"path":"/docs/knowledgeShard/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%A4%87%E4%BB%BD%E8%BF%98%E5%8E%9F.html","title":"数据库备份还原","lang":"zh-CN","frontmatter":{"title":"数据库备份还原"},"headers":[{"level":2,"title":"备份","slug":"备份","link":"#备份","children":[{"level":3,"title":"全量备份","slug":"全量备份","link":"#全量备份","children":[]},{"level":3,"title":"增量备份","slug":"增量备份","link":"#增量备份","children":[]}]},{"level":2,"title":"还原","slug":"还原","link":"#还原","children":[{"level":3,"title":"全量还原","slug":"全量还原","link":"#全量还原","children":[]},{"level":3,"title":"增量还原","slug":"增量还原","link":"#增量还原","children":[]}]},{"level":2,"title":"crontab定时任务","slug":"crontab定时任务","link":"#crontab定时任务","children":[]}],"git":{"updatedTime":1704778322000,"contributors":[{"name":"czx","email":"2504058202@qq.com","commits":5}]},"filePathRelative":"docs/knowledgeShard/数据库备份还原.md"}');export{h as comp,g as data};
