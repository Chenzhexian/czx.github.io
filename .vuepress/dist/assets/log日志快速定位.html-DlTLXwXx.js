import{_ as a,o as n,c as s,e}from"./app-CzSBTTj3.js";const t={},l=e(`<p>动态查看日志</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">tail</span> <span class="token parameter variable">-f</span> catalina.ou
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从头打开日志文件</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">cat</span> catalina.ou
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以使用 &gt;nanjiangtest.txt 输出某个新日志去查看</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token parameter variable">-n</span> catalina.out <span class="token operator">|</span><span class="token function">grep</span> <span class="token number">717892466</span> <span class="token operator">&gt;</span>nanjiangtest.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>记录一下工作时突发情况，一台服务器的数据库被误删了数据，这个数据库每天都有全量备份，于是用到了下面的方法</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#从全备份中提取出该表的建表语句</span>
<span class="token function">sed</span> -e<span class="token string">&#39;/./{H;$!d;}&#39;</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;x;/CREATE TABLE \`表名\`/!d;q&#39;</span> 全备库或导出的单库.sql <span class="token operator">&gt;</span> 表tt.sql

<span class="token comment">#提取该表的insert into语句,追加到上一个建库sql后</span>
<span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;INSERT INTO \`表名\`&#39;</span> 全备库或导出的单库.sql <span class="token operator">&gt;&gt;</span>表tt.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><p>ail/head简单命令使用：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">tail</span> <span class="token parameter variable">-n</span> number catalina.out 查询日志尾部最后number行的日志
<span class="token function">tail</span> <span class="token parameter variable">-n</span> +number catalina.out 查询number行之后的所有日志
<span class="token function">head</span> <span class="token parameter variable">-n</span> number catalina.out 查询日志文件中的前number行日志
<span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">-number</span> catalina.out 查询日志文件除了最后number行的其他所有日志
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方式一-根据关键字查找出行号" tabindex="-1"><a class="header-anchor" href="#方式一-根据关键字查找出行号"><span>方式一：根据关键字查找出行号</span></a></h3><hr><p>用grep拿到的日志很少，我们需要查看附近的日志。我是这样做的，首先: cat -n test.log | grep “关键词” 得到关键日志的行号</p><p><img src="https://czxcab.cn/file/docs/log1.jpg" alt="图片"></p><p><code>cat -n xxx.log|tail -n +46756|head -n 10</code></p><p><code>tail -n +46756</code>表示查询46756行之后的日志</p><p><code>head -n 10</code>则表示在前面的查询结果里再查前10条记录</p><p>也就是查询从46756行开始的后10行 <img src="https://czxcab.cn/file/docs/log2.jpg" alt="图片"></p><p>那么如果要查前10行怎么办?</p><p><code>cat -n xxx.log|head -n 46756|tail -n 10</code></p><p><code>head -n 10</code>表示查询结果里查前46756条记录</p><p><code>tail -n 10</code>则表示在前面的查询结果里再查后10条记录</p><p><img src="https://czxcab.cn/file/docs/log3.jpg" alt="图片"></p><h3 id="方式二-查看指定时间段内的日志" tabindex="-1"><a class="header-anchor" href="#方式二-查看指定时间段内的日志"><span>方式二：查看指定时间段内的日志</span></a></h3><hr><p>首先要进行范围时间段内日志查询先查看是否在当前日之内存在</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">grep</span> <span class="token string">&#39;11:07 18:29:20&#39;</span> xxx.log
<span class="token function">grep</span> <span class="token string">&#39;11:07 18:31:11&#39;</span> xxx.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>时间范围内的查询</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;/11:07 18:29:20/,/11:07 18:31:11/p&#39;</span> xxx.log
<span class="token function">sed</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;/11:07 18:29:/,/11:07 18:31:/p&#39;</span> xxx.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方式三-查看日志中特定字符的匹配数目" tabindex="-1"><a class="header-anchor" href="#方式三-查看日志中特定字符的匹配数目"><span>方式三：查看日志中特定字符的匹配数目</span></a></h3><hr><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">grep</span> <span class="token string">&#39;1175109632&#39;</span> xxx.log <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span> 

<span class="token number">154</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方式四-查询最后number行-并查找关键字" tabindex="-1"><a class="header-anchor" href="#方式四-查询最后number行-并查找关键字"><span>方式四：查询最后number行，并查找关键字</span></a></h3><hr><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@yesky logs<span class="token punctuation">]</span><span class="token comment"># tail -n 5 xxx.log | grep &#39;INFO Takes:1&#39;</span>
<span class="token punctuation">[</span><span class="token number">11</span>:11 <span class="token number">22</span>:02:51<span class="token punctuation">]</span> INFO Takes:1 ms class com.tmg.cms.manager.dao.sitemap.impl.SitemapDaoImpl getSitemapTop <span class="token punctuation">[</span>MTE5MDMw<span class="token punctuation">]</span> <span class="token punctuation">[</span>int<span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">11</span>:11 <span class="token number">22</span>:02:51<span class="token punctuation">]</span> INFO Takes:1 ms class com.tmg.cms.manager.dao.sitemap.impl.SitemapDaoImpl getSitemapTop <span class="token punctuation">[</span>NTQ2MzQw<span class="token punctuation">]</span> <span class="token punctuation">[</span>int<span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">11</span>:11 <span class="token number">22</span>:02:51<span class="token punctuation">]</span> INFO Takes:1 ms class com.tmg.cms.manager.dao.sitemap.impl.SitemapDaoImpl getSitemapTop <span class="token punctuation">[</span>NTg2NzYy<span class="token punctuation">]</span> <span class="token punctuation">[</span>int<span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">11</span>:11 <span class="token number">22</span>:02:51<span class="token punctuation">]</span> INFO Takes:1 ms class com.tmg.cms.manager.dao.sitemap.impl.SitemapDaoImpl getSitemapTop <span class="token punctuation">[</span>MzYyMjA<span class="token operator">=</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>int<span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">11</span>:11 <span class="token number">22</span>:02:51<span class="token punctuation">]</span> INFO Takes:1 ms class com.tmg.cms.manager.dao.configModule.impl.ConfigModuleDaoImpl getPersonMenuList
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方式五-查询最后number行-并查找关键字-结果-并且对结果进行标红-上下扩展两行" tabindex="-1"><a class="header-anchor" href="#方式五-查询最后number行-并查找关键字-结果-并且对结果进行标红-上下扩展两行"><span>方式五：查询最后number行，并查找关键字“结果”并且对结果进行标红，上下扩展两行</span></a></h3><hr><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@yesky logs<span class="token punctuation">]</span><span class="token comment"># tail -n 5 xxx.log | grep &#39;INFO Takes:1&#39; --color -a2</span>
<span class="token punctuation">[</span><span class="token number">11</span>:11 <span class="token number">22</span>:02:51<span class="token punctuation">]</span> INFO Takes:0 ms class com.tmg.cms.manager.dao.article.impl.ArticleContentDaoImpl getArticlePageNum <span class="token punctuation">[</span>NzE4MTM2ODky<span class="token punctuation">]</span> <span class="token punctuation">[</span>int<span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">11</span>:11 <span class="token number">22</span>:02:51<span class="token punctuation">]</span> INFO Takes:1 ms class com.tmg.cms.manager.dao.config.impl.ConfigInfoDaoImpl load <span class="token punctuation">[</span>com.tmg.cms.manager.model.config.ConfigInfo<span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">11</span>:11 <span class="token number">22</span>:02:51<span class="token punctuation">]</span> INFO Takes:1 ms class com.tmg.cms.manager.dao.sitemap.impl.SitemapDaoImpl getSitemapTop <span class="token punctuation">[</span>NTkwOTQ5<span class="token punctuation">]</span> <span class="token punctuation">[</span>int<span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">11</span>:11 <span class="token number">22</span>:02:51<span class="token punctuation">]</span> INFO Takes:1 ms class com.tmg.cms.manager.dao.sitemap.impl.SitemapDaoImpl getSitemapTop <span class="token punctuation">[</span>MzI0<span class="token punctuation">]</span> <span class="token punctuation">[</span>int<span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">11</span>:11 <span class="token number">22</span>:02:51<span class="token punctuation">]</span> INFO Takes:0 ms class com.tmg.cms.manager.dao.sitemap.impl.SitemapDaoImpl getSitemapTop <span class="token punctuation">[</span>MzI1<span class="token punctuation">]</span> <span class="token punctuation">[</span>int<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="附加" tabindex="-1"><a class="header-anchor" href="#附加"><span>附加</span></a></h3><hr><ol><li>全屏导航</li></ol><ul><li>ctrl + F - 向前移动一屏</li><li>ctrl + B - 向后移动一屏</li><li>ctrl + D - 向前移动半屏</li><li>ctrl + U - 向后移动半屏</li></ul><ol start="2"><li>单行导航</li></ol><ul><li>j - 向前移动一行</li><li>k - 向后移动一行</li></ul><ol start="3"><li>其它导航</li></ol><ul><li>G - 移动到最后一行</li><li>g - 移动到第一行</li><li>q / ZZ - 退出 less 命令</li></ul>`,45),p=[l];function i(c,o){return n(),s("div",null,p)}const r=a(t,[["render",i],["__file","log日志快速定位.html.vue"]]),d=JSON.parse('{"path":"/docs/technicalDocument/%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/log%E6%97%A5%E5%BF%97%E5%BF%AB%E9%80%9F%E5%AE%9A%E4%BD%8D.html","title":"log日志快速定位","lang":"zh-CN","frontmatter":{"title":"log日志快速定位"},"headers":[{"level":3,"title":"方式一：根据关键字查找出行号","slug":"方式一-根据关键字查找出行号","link":"#方式一-根据关键字查找出行号","children":[]},{"level":3,"title":"方式二：查看指定时间段内的日志","slug":"方式二-查看指定时间段内的日志","link":"#方式二-查看指定时间段内的日志","children":[]},{"level":3,"title":"方式三：查看日志中特定字符的匹配数目","slug":"方式三-查看日志中特定字符的匹配数目","link":"#方式三-查看日志中特定字符的匹配数目","children":[]},{"level":3,"title":"方式四：查询最后number行，并查找关键字","slug":"方式四-查询最后number行-并查找关键字","link":"#方式四-查询最后number行-并查找关键字","children":[]},{"level":3,"title":"方式五：查询最后number行，并查找关键字“结果”并且对结果进行标红，上下扩展两行","slug":"方式五-查询最后number行-并查找关键字-结果-并且对结果进行标红-上下扩展两行","link":"#方式五-查询最后number行-并查找关键字-结果-并且对结果进行标红-上下扩展两行","children":[]},{"level":3,"title":"附加","slug":"附加","link":"#附加","children":[]}],"git":{"updatedTime":1715061248000,"contributors":[{"name":"czx","email":"2504058202@qq.com","commits":1}]},"filePathRelative":"docs/technicalDocument/常用工具/log日志快速定位.md"}');export{r as comp,d as data};
