import{_ as n,o as s,c as a,e as t}from"./app-BoIshBAq.js";const e={},p=t(`<h1 id="easyexcel-导出文件" tabindex="-1"><a class="header-anchor" href="#easyexcel-导出文件"><span>EasyExcel 导出文件</span></a></h1><h2 id="easyexcel导出数据" tabindex="-1"><a class="header-anchor" href="#easyexcel导出数据"><span>EasyExcel导出数据</span></a></h2><h3 id="引入pom文件" tabindex="-1"><a class="header-anchor" href="#引入pom文件"><span>引入pom文件</span></a></h3><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- easy-excel --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>easyexcel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.2.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义导出对象" tabindex="-1"><a class="header-anchor" href="#定义导出对象"><span>定义导出对象</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Excel订单信息导出
 *
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IndentExcelVO</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 订单编号
     */</span>
    <span class="token annotation punctuation">@ColumnWidth</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@NumberFormat</span><span class="token punctuation">(</span><span class="token string">&quot;#&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;订单编号&quot;</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户姓名
     */</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;用户姓名&quot;</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> realName<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 手机号
     */</span>
    <span class="token annotation punctuation">@ColumnWidth</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;手机号&quot;</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> information<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 接亲日期
     */</span>
    <span class="token annotation punctuation">@ColumnWidth</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;接亲日期&quot;</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> date_time<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 开始时间
     */</span>
    <span class="token annotation punctuation">@ColumnWidth</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;开始时间&quot;</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> start_time<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 结束时间
     */</span>
    <span class="token annotation punctuation">@ColumnWidth</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;结束时间&quot;</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> end_time<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 接亲地址
     */</span>
    <span class="token annotation punctuation">@ColumnWidth</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;接亲地址&quot;</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> address<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 订单总金额
     */</span>
    <span class="token annotation punctuation">@NumberFormat</span><span class="token punctuation">(</span><span class="token string">&quot;#&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;订单总金额&quot;</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Double</span> amount<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 订单状态
     */</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;订单状态&quot;</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> indent_state<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 支付状态
     */</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;支付状态&quot;</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">9</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> payment_state<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 订单创建时间
     */</span>
    <span class="token annotation punctuation">@ColumnWidth</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;订单创建时间&quot;</span><span class="token punctuation">,</span> index <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> createTime<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义工具类" tabindex="-1"><a class="header-anchor" href="#定义工具类"><span>定义工具类</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Excel工具类
 *
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExcelUtils</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 获取路径
     *
     * <span class="token keyword">@return</span> 当前路径
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">ExcelUtils</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建新文件
     *
     * <span class="token keyword">@param</span> <span class="token parameter">pathName</span> 文件名
     * <span class="token keyword">@return</span> 文件
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">File</span> <span class="token function">createNewFile</span><span class="token punctuation">(</span><span class="token class-name">String</span> pathName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> pathName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            file<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>file<span class="token punctuation">.</span><span class="token function">getParentFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                file<span class="token punctuation">.</span><span class="token function">getParentFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mkdirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> file<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 设置响应结果
     *
     * <span class="token keyword">@param</span> <span class="token parameter">response</span>    响应结果对象
     * <span class="token keyword">@param</span> <span class="token parameter">rawFileName</span> 文件名
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setExcelResponseProp</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">String</span> rawFileName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//设置内容类型</span>
        response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">&quot;application/vnd.vnd.ms-excel&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置编码格式</span>
        response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">&quot;utf-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置导出文件名称（避免乱码）</span>
        <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token class-name">URLEncoder</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>rawFileName<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;.xlsx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置响应头</span>
        response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-disposition&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;attachment;filename*=utf-8&#39;&#39;&quot;</span> <span class="token operator">+</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Date转String
     *
     * <span class="token keyword">@param</span> <span class="token parameter">date</span> 日期
     * <span class="token keyword">@return</span> 字符串
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">dateToString</span><span class="token punctuation">(</span><span class="token class-name">Date</span> date<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>date <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token class-name">ErrorCode</span><span class="token punctuation">.</span><span class="token constant">NOT_FOUND_ERROR</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// Date转换为String</span>
        <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> sdf<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写接口" tabindex="-1"><a class="header-anchor" href="#编写接口"><span>编写接口</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 订单信息导出
 */</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/download&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@AuthCheck</span><span class="token punctuation">(</span>mustRole <span class="token operator">=</span> <span class="token constant">ADMIN_ROLE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">download</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取数据，根据自身业务修改</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Indent</span><span class="token punctuation">&gt;</span></span> data <span class="token operator">=</span> indentService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">IndentExcelVO</span><span class="token punctuation">&gt;</span></span> indentList <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>item <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token class-name">IndentExcelVO</span> indentExcelVO <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IndentExcelVO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> indentExcelVO<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Date转字符串</span>
        indentExcelVO<span class="token punctuation">.</span><span class="token function">setDate_time</span><span class="token punctuation">(</span><span class="token class-name">ExcelUtils</span><span class="token punctuation">.</span><span class="token function">dateToString</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getDate_time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        indentExcelVO<span class="token punctuation">.</span><span class="token function">setCreateTime</span><span class="token punctuation">(</span><span class="token class-name">ExcelUtils</span><span class="token punctuation">.</span><span class="token function">dateToString</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getCreateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> indentExcelVO<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 设置导出名称</span>
    <span class="token class-name">ExcelUtils</span><span class="token punctuation">.</span><span class="token function">setExcelResponseProp</span><span class="token punctuation">(</span>response<span class="token punctuation">,</span> <span class="token string">&quot;订单信息&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 获取输出流名称</span>
    <span class="token class-name">OutputStream</span> outputStream <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 这里 需要指定写用哪个class去写，然后写到第一个sheet，名字为模板 然后文件流会自动关闭</span>
    <span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>outputStream<span class="token punctuation">,</span> <span class="token class-name">IndentExcelVO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>  <span class="token comment">// 对应实体类</span>
        <span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span><span class="token string">&quot;订单数据&quot;</span><span class="token punctuation">)</span>  <span class="token comment">// sheet页名称</span>
        <span class="token punctuation">.</span><span class="token function">doWrite</span><span class="token punctuation">(</span>indentList<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 导出的数据集合</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="遇到的问题" tabindex="-1"><a class="header-anchor" href="#遇到的问题"><span>遇到的问题</span></a></h3><blockquote><p>关于Date字段导出问题</p></blockquote><p>启动服务，调用接口，成功导出 Excel文件，但是文件没有数据，且报错：<code>Can not find ‘Converter‘ support class Date.</code></p><p>报错原因：导出 Excel 表格时候，默认不支持 DateTime 日期格式，所以需要指定 DateTime 类型的字段的日期格式。</p><p>解决方式1：将Date转换为String</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">IndentExcelVO</span><span class="token punctuation">&gt;</span></span> indentList <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>item <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">IndentExcelVO</span> indentExcelVO <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IndentExcelVO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> indentExcelVO<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Date转字符串</span>
    indentExcelVO<span class="token punctuation">.</span><span class="token function">setDate_time</span><span class="token punctuation">(</span><span class="token class-name">ExcelUtils</span><span class="token punctuation">.</span><span class="token function">dateToString</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getDate_time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    indentExcelVO<span class="token punctuation">.</span><span class="token function">setCreateTime</span><span class="token punctuation">(</span><span class="token class-name">ExcelUtils</span><span class="token punctuation">.</span><span class="token function">dateToString</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getCreateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> indentExcelVO<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方式2：定义转换器</p>`,17),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(e,[["render",o],["__file","EasyExcel导出文件.html.vue"]]),d=JSON.parse('{"path":"/docs/knowledgeShard/EasyExcel%E5%AF%BC%E5%87%BA%E6%96%87%E4%BB%B6.html","title":"EasyExcel导出文件","lang":"zh-CN","frontmatter":{"title":"EasyExcel导出文件"},"headers":[{"level":2,"title":"EasyExcel导出数据","slug":"easyexcel导出数据","link":"#easyexcel导出数据","children":[{"level":3,"title":"引入pom文件","slug":"引入pom文件","link":"#引入pom文件","children":[]},{"level":3,"title":"定义导出对象","slug":"定义导出对象","link":"#定义导出对象","children":[]},{"level":3,"title":"定义工具类","slug":"定义工具类","link":"#定义工具类","children":[]},{"level":3,"title":"编写接口","slug":"编写接口","link":"#编写接口","children":[]},{"level":3,"title":"遇到的问题","slug":"遇到的问题","link":"#遇到的问题","children":[]}]}],"git":{"updatedTime":1704359960000,"contributors":[{"name":"czx","email":"2504058202@qq.com","commits":2}]},"filePathRelative":"docs/knowledgeShard/EasyExcel导出文件.md"}');export{k as comp,d as data};
