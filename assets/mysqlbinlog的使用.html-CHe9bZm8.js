import{_ as n,o as i,c as e,e as l}from"./app-BoIshBAq.js";const s={},d=l(`<h2 id="什么是binlog" tabindex="-1"><a class="header-anchor" href="#什么是binlog"><span>什么是binlog？</span></a></h2><p>binlog，也称为二进制日志，记录对数据发生或潜在发生更改的SQL语句，并以二进制的形式保存在磁盘中，可以用来查看数据库的变更历史（具体的时间点所有的SQL操作）、数据库增量备份和恢复（增量备份和基于时间点的恢复）、Mysql的复制（主主数据库的复制、主从数据库的复制）。</p><h2 id="如何开启binlog" tabindex="-1"><a class="header-anchor" href="#如何开启binlog"><span>如何开启binlog？</span></a></h2><p>首先我们可以进入mysql输入命令</p><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>show variables like &#39;%bin%&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以通过这个命令来查询关于binlog相关的设置，其中有一个<code>log_bin</code>选项，如果为<code>off</code>，那么证明我们的binlog没有开启，如果为<code>on</code>证明我们的binlog已经开启</p><p><img src="https://czxcab.cn/file/docs/binlog1.jpg" alt=""></p><p>开启binlog的方法很简单，只需要打开mysql的配置文件<code>my.ini</code>（也可能是<code>my.cnf</code>），找到log-bin，去掉前面的#号，如果没有该选项，则可以手动添加。</p><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>[mysqld]
# 不指定路径
log-bin=mysql-bin
# 指定路径
log-bin=/yourpath/mysql-bin
# 这个值在不同的 MySQL 实例中必须是唯一的
server-id=1  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>mysql-bin</code>就是日志文件的名称了，日志文件的名称和路径都可以自定义，如果不配置路径和名称，默认的二进制日志路径通常是 MySQL 数据目录（也就是配置文件中<code>datadir</code>的目录），名称为<code>mysql-bin.xxxxxx</code>。</p><p>添加完成后重启mysql，我们就会对应目录下找到binlog日志文件了，首次使用binlog的时候会出现两个文件，一个是<code>mysql-bin.000001</code>，一个是<code>mysql-bin.index</code>，其中，000001结尾的文件就是我们需要的日志文件，它包含了我们数据库的所有增，改，删操作（查询操作不做记录），以index结尾的文件是索引文件，包含了所有的以000xxx结尾的日志文件。</p><p>常用的操作:</p><ul><li><p>1.查找当前操作的binlog状态</p><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>show master status;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>2.flush logs刷新状态</p><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>flush logs;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>3.查找删除数据的起始位置、时间等关键信息</p><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>show binlog events in &#39;mysql-bin.000001&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h2 id="如何使用mysqlbinlog查询操作记录" tabindex="-1"><a class="header-anchor" href="#如何使用mysqlbinlog查询操作记录"><span>如何使用mysqlbinlog查询操作记录？</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mysqlbinlog <span class="token parameter variable">--help</span>
<span class="token comment"># 通过该命令我们可以了解到mysqlbinlog可以附带哪些参数</span>
<span class="token comment"># 不同的参数对应什么状况。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-读取所有数据库的操作" tabindex="-1"><a class="header-anchor" href="#_1-读取所有数据库的操作"><span>1.读取所有数据库的操作</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 通过该命令，我们可以看到该日志文件中记录的所有数据库的增，该，删操作。</span>
mysqlbinlog <span class="token punctuation">..</span>/data/mysql-bin.000001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-查询指定数据库的操作" tabindex="-1"><a class="header-anchor" href="#_2-查询指定数据库的操作"><span>2.查询指定数据库的操作</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 通过该命令，我们可以查询数据库名称为test的增，该，删操作</span>
mysqlbinlog <span class="token parameter variable">--database</span><span class="token operator">=</span>test <span class="token punctuation">..</span>/data/mysql-bin.000001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-查询指定位置的操作" tabindex="-1"><a class="header-anchor" href="#_3-查询指定位置的操作"><span>3.查询指定位置的操作</span></a></h3><p>binlog每次进行记录的时候都会为其标注一个position，用于标识该操作所在的位置，与之相关的参数为<code>--start-position</code>（开始位置）和<code>--stop-position</code>（结束位置），我们可以通过position进行指定操作的查询。</p><p><strong>如何获取position的值？</strong><img src="https://czxcab.cn/file/docs/binlog2.jpg" alt=""></p><p>只需要在mysql中使用<code>show binlog events</code>即可，每一行都记录了一条操作，其中Pos就是该操作的start-position，<code>End_log_pos</code>就是stop-position。我们如果需要查询上述图片中的操作，可以使用以下语句：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mysqlbinlog --start-position<span class="token operator">=</span><span class="token number">4</span> --stop-position<span class="token operator">=</span><span class="token number">98</span> <span class="token punctuation">..</span>/data/mysql-bin.000001 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-查询指定时间的操作" tabindex="-1"><a class="header-anchor" href="#_4-查询指定时间的操作"><span>4.查询指定时间的操作</span></a></h3><p>除了有位置标识外，binlog还有时间标识，参数为<code>--start-datetime</code>（开始时间）和<code>--stop-datetime</code>（结束时间），如果想要查询某个时间段的操作，可以使用该参数。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mysqlbinlog --start-datetime<span class="token operator">=</span><span class="token string">&quot;2015-08-08 10:00:00&quot;</span> --stop-datetime<span class="token operator">=</span><span class="token string">&quot;2015-08-08 12:00:00&quot;</span> <span class="token punctuation">..</span>/data/mysql-bin.000001 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>常用的查询操作也就这么多了，查询操作不是我们的目的，恢复记录才是我们的目的，一切的查询都是为了恢复。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>使用mysqlbinlog时终端无法正确显示这些二进制数据。在这种情况下，可以尝试使用--base64-output选项以Base64编码的形式输出：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># -vv:详细输出(包含sql语句)</span>
mysqlbinlog --base64-output<span class="token operator">=</span>DECODE-ROWS <span class="token parameter variable">-vv</span> binlog.000001 <span class="token operator">&gt;</span> output.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="如何恢复删除记录" tabindex="-1"><a class="header-anchor" href="#如何恢复删除记录"><span>如何恢复删除记录？</span></a></h2><p>如果你对于查询操作了如指掌了，那么恢复操作就简单的多了，因为恢复数据就是在查询的基础上，恢复的方法大致分为两种：</p><h3 id="_1-直接使用mysqlbinlog进行查询带恢复" tabindex="-1"><a class="header-anchor" href="#_1-直接使用mysqlbinlog进行查询带恢复"><span>1.直接使用mysqlbinlog进行查询带恢复</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mysqlbinlog --start-position<span class="token operator">=</span><span class="token number">4</span> --stop-position<span class="token operator">=</span><span class="token number">98</span> mysql-bin.000001 <span class="token operator">|</span> mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令跟查询操作不同的地方在于尾部添加了<code>| mysql -u root -p</code>，该命令是用于连接数据库，整条命令连接起来就是恢复开始位置为4，结束位置为98的所有操作（不限于单行记录的恢复，如果想要用于连续的多行操作，只需要把最后的结束位置设置为最后一个需要进行恢复的行的<code>End_log_pos</code>即可）</p><h3 id="_2-先导出查询记录-然后通过mysql-source操作进行数据恢复" tabindex="-1"><a class="header-anchor" href="#_2-先导出查询记录-然后通过mysql-source操作进行数据恢复"><span>2.先导出查询记录，然后通过mysql source操作进行数据恢复</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mysqlbinlog --start-position<span class="token operator">=</span><span class="token number">4</span> --stop-position<span class="token operator">=</span><span class="token number">98</span> <span class="token punctuation">..</span>/data/mysql-bin.000001 <span class="token operator">&gt;</span> test.sql

mysql<span class="token operator">&gt;</span>source test.sql 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="误删除数据恢复" tabindex="-1"><a class="header-anchor" href="#误删除数据恢复"><span>误删除数据恢复</span></a></h2><h3 id="_1-源数据模拟" tabindex="-1"><a class="header-anchor" href="#_1-源数据模拟"><span>1.源数据模拟</span></a></h3><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>#### 创建lili库,并进入到lili库下面
create database if not exists lili character set utf8 collate utf8_general_ci;
use lili;


#### 创建test1表
create table if not exists test1(
  id int unsigned not null auto_increment comment&quot;序列&quot;,
  name varchar(20) not null comment&quot;姓名&quot;,
  sex enum(&quot;男&quot;,&quot;女&quot;) not null comment&quot;性别&quot;,
  age tinyint unsigned not null comment&quot;年龄&quot;,
  height float(5,2) not null comment&quot;身高&quot;,
  weight float(5,2) not null comment&quot;体重&quot;,
  gr_sc varchar(30) not null comment&quot;毕业院校&quot;,
  education varchar(10) not null comment&quot;学历&quot;,
  phone char(11) not null comment&quot;电话号码&quot;,
  email varchar(30) not null comment&quot;邮箱&quot;,
  salary float(9,2) unsigned not null comment&quot;薪资&quot;,
  primary key(id)
)engine=innodb character set utf8 collate utf8_general_ci comment&quot;测试表1&quot;;


#### 查看test1表的表结构
mysql&gt; desc test1;
+-----------+---------------------+------+-----+---------+----------------+
| Field     | Type                | Null | Key | Default | Extra          |
+-----------+---------------------+------+-----+---------+----------------+
| id        | int(10) unsigned    | NO   | PRI | NULL    | auto_increment |
| name      | varchar(20)         | NO   |     | NULL    |                |
| sex       | enum(&#39;男&#39;,&#39;女&#39;)      | NO   |     | NULL    |                |
| age       | tinyint(3) unsigned | NO   |     | NULL    |                |
| height    | float(5,2)          | NO   |     | NULL    |                |
| weight    | float(5,2)          | NO   |     | NULL    |                |
| gr_sc     | varchar(30)         | NO   |     | NULL    |                |
| education | varchar(10)         | NO   |     | NULL    |                |
| phone     | char(11)            | NO   |     | NULL    |                |
| email     | varchar(30)         | NO   |     | NULL    |                |
| salary    | float(9,2) unsigned | NO   |     | NULL    |                |
+-----------+---------------------+------+-----+---------+----------------+
11 rows in set (0.01 sec)
    # 注意test1表的id字段是auto_increment(自增)的,且有主键索引;
    # 注意test1表的sex字段是enum数据类型


#### 往test1表中插入几条数据
insert into test1(name,sex,age,height,weight,gr_sc,education,phone,email,salary) values
(&quot;cl01&quot;,&quot;男&quot;,21,171,65.5,&quot;四川信息1&quot;,&quot;专科&quot;,&quot;18382024221&quot;,&quot;158317096@qq.com&quot;,6000),
(&quot;cl02&quot;,&quot;男&quot;,22,172,65.5,&quot;四川信息2&quot;,&quot;专科&quot;,&quot;18382024222&quot;,&quot;158317096@qq.com&quot;,6200),
(&quot;cl03&quot;,&quot;男&quot;,23,173,65.5,&quot;四川信息3&quot;,&quot;专科&quot;,&quot;18382024223&quot;,&quot;158317096@qq.com&quot;,6300),
(&quot;cl04&quot;,&quot;男&quot;,24,174,65.5,&quot;四川信息4&quot;,&quot;专科&quot;,&quot;18382024224&quot;,&quot;158317096@qq.com&quot;,6400),
(&quot;cl05&quot;,&quot;男&quot;,25,175,65.5,&quot;四川信息5&quot;,&quot;专科&quot;,&quot;18382024225&quot;,&quot;158317096@qq.com&quot;,6500),
(&quot;cl06&quot;,&quot;男&quot;,26,176,65.5,&quot;四川信息6&quot;,&quot;专科&quot;,&quot;18382024226&quot;,&quot;158317096@qq.com&quot;,6600),
(&quot;cl07&quot;,&quot;男&quot;,27,177,65.5,&quot;四川信息7&quot;,&quot;专科&quot;,&quot;18382024227&quot;,&quot;158317096@qq.com&quot;,6700),
(&quot;cl08&quot;,&quot;男&quot;,28,178,65.5,&quot;四川信息8&quot;,&quot;专科&quot;,&quot;18382024228&quot;,&quot;158317096@qq.com&quot;,6800),
(&quot;cl09&quot;,&quot;男&quot;,29,179,65.5,&quot;四川信息9&quot;,&quot;专科&quot;,&quot;18382024229&quot;,&quot;158317096@qq.com&quot;,6900),
(&quot;cl10&quot;,&quot;男&quot;,30,180,65.5,&quot;四川信息10&quot;,&quot;专科&quot;,&quot;18382024230&quot;,&quot;158317100@qq.com&quot;,7000);
commit;


#### 查看test1表中的数据
mysql&gt; select * from test1;
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
| id | name | sex | age | height | weight | gr_sc          | education | phone       | email            | salary  |
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
|  1 | cl01 | 男  |  21 | 171.00 |  65.50 | 四川信息1        | 专科      | 18382024221 | 158317096@qq.com | 6000.00 |
|  2 | cl02 | 男  |  22 | 172.00 |  65.50 | 四川信息2        | 专科      | 18382024222 | 158317096@qq.com | 6200.00 |
|  3 | cl03 | 男  |  23 | 173.00 |  65.50 | 四川信息3        | 专科      | 18382024223 | 158317096@qq.com | 6300.00 |
|  4 | cl04 | 男  |  24 | 174.00 |  65.50 | 四川信息4        | 专科      | 18382024224 | 158317096@qq.com | 6400.00 |
|  5 | cl05 | 男  |  25 | 175.00 |  65.50 | 四川信息5        | 专科      | 18382024225 | 158317096@qq.com | 6500.00 |
|  6 | cl06 | 男  |  26 | 176.00 |  65.50 | 四川信息6        | 专科      | 18382024226 | 158317096@qq.com | 6600.00 |
|  7 | cl07 | 男  |  27 | 177.00 |  65.50 | 四川信息7        | 专科      | 18382024227 | 158317096@qq.com | 6700.00 |
|  8 | cl08 | 男  |  28 | 178.00 |  65.50 | 四川信息8        | 专科      | 18382024228 | 158317096@qq.com | 6800.00 |
|  9 | cl09 | 男  |  29 | 179.00 |  65.50 | 四川信息9        | 专科      | 18382024229 | 158317096@qq.com | 6900.00 |
| 10 | cl10 | 男  |  30 | 180.00 |  65.50 | 四川信息10       | 专科      | 18382024230 | 158317100@qq.com | 7000.00 |
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
10 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-故障的模拟" tabindex="-1"><a class="header-anchor" href="#_2-故障的模拟"><span>2.故障的模拟</span></a></h3><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>####  删除id等于10的记录
mysql&gt; select * from test1 where id=10; 
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
| id | name | sex | age | height | weight | gr_sc          | education | phone       | email            | salary  |
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
| 10 | cl10 | 男  |  30 | 180.00 |  65.50 | 四川信息10       | 专科      | 18382024230 | 158317100@qq.com | 7000.00 |
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
1 row in set (0.00 sec)

mysql&gt; delete from test1 where id=10;      # 删除test1表中id等于10的记录
Query OK, 1 row affected (0.00 sec)

mysql&gt; select * from test1 where id=10;     # 查看test1表中id等于10的记录是否删除成功
Empty set (0.00 sec)


                  PS：业务还在产生数据


#### 往test1表中再插入数据
insert into test1(name,sex,age,height,weight,gr_sc,education,phone,email,salary) values
(&quot;chenliang01&quot;,&quot;男&quot;,21,171,65.5,&quot;四川信息1&quot;,&quot;专科&quot;,&quot;18382024221&quot;,&quot;158317096@qq.com&quot;,6000);
commit;


#### 查看test1表中的数据
mysql&gt; select * from test1;
+----+-------------+-----+-----+--------+--------+---------------+-----------+-------------+------------------+---------+
| id | name        | sex | age | height | weight | gr_sc         | education | phone       | email            | salary  |
+----+-------------+-----+-----+--------+--------+---------------+-----------+-------------+------------------+---------+
|  1 | cl01        | 男  |  21 | 171.00 |  65.50 | 四川信息1       | 专科      | 18382024221 | 158317096@qq.com | 6000.00 |
|  2 | cl02        | 男  |  22 | 172.00 |  65.50 | 四川信息2       | 专科      | 18382024222 | 158317096@qq.com | 6200.00 |
|  3 | cl03        | 男  |  23 | 173.00 |  65.50 | 四川信息3       | 专科      | 18382024223 | 158317096@qq.com | 6300.00 |
|  4 | cl04        | 男  |  24 | 174.00 |  65.50 | 四川信息4       | 专科      | 18382024224 | 158317096@qq.com | 6400.00 |
|  5 | cl05        | 男  |  25 | 175.00 |  65.50 | 四川信息5       | 专科      | 18382024225 | 158317096@qq.com | 6500.00 |
|  6 | cl06        | 男  |  26 | 176.00 |  65.50 | 四川信息6       | 专科      | 18382024226 | 158317096@qq.com | 6600.00 |
|  7 | cl07        | 男  |  27 | 177.00 |  65.50 | 四川信息7       | 专科      | 18382024227 | 158317096@qq.com | 6700.00 |
|  8 | cl08        | 男  |  28 | 178.00 |  65.50 | 四川信息8       | 专科      | 18382024228 | 158317096@qq.com | 6800.00 |
|  9 | cl09        | 男  |  29 | 179.00 |  65.50 | 四川信息9       | 专科      | 18382024229 | 158317096@qq.com | 6900.00 |
| 11 | chenliang01 | 男  |  21 | 171.00 |  65.50 | 四川信息1       | 专科      | 18382024221 | 158317096@qq.com | 6000.00 |
+----+-------------+-----+-----+--------+--------+---------------+-----------+-------------+------------------+---------+
10 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-解决思路" tabindex="-1"><a class="header-anchor" href="#_3-解决思路"><span>3.解决思路</span></a></h3><ol><li><p>在得知使用delete语句误删除了数据,这里是一条记录哈;需要做的事情：</p><ul><li>A：使用<code>show master status</code>;命令查看看当前binlog是哪个文件,并记录下来;</li><li>B：执行<code>flush logs</code>命令重新生成新的binlog日志文件来记录sql语句产生的记录;</li><li>C：确定删除数据的命令是什么,这里是：<code>delete from test1 where id=10;</code></li></ul></li><li><p>对“01阶段”中的“A步骤”中的binlog日志做备份(复制一份到其它目录下,防止损坏源binlog文件);</p></li><li><p>在mysql中使用<code>show binlog events in </code>01阶段中A步骤记录的binlog文件名;命令找到<code>delete from test1 where id=10</code>；这条语句(事务)的起始pos点和结束pos点;</p></li><li><p>用<code>mysqlbinlog</code>命令结合&quot;03阶段&quot;找到的起始pos点和结束pos点对&quot;02步骤&quot;复制的binlog文件 进行解释并生成新的文件;</p></li><li><p>在“04阶段”中新生成的文件中进行处理,这里要结合到test1表的表结构来进行处理哈;</p></li><li><p>恢复06阶段处理好的sql语句;</p></li></ol><h3 id="_4-故障的处理" tabindex="-1"><a class="header-anchor" href="#_4-故障的处理"><span>4.故障的处理</span></a></h3><blockquote><p>解决思路中的01阶段</p></blockquote><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>#### 查看当前binlog日志文件是哪个
mysql&gt; show master status\\G
*************************** 1. row ***************************
             File: 21_mysql_bin.000001
         Position: 4210
     Binlog_Do_DB: 
 Binlog_Ignore_DB: 
Executed_Gtid_Set: 
1 row in set (0.00 sec)


#### 使用flush logs命令重新生成新的binlog命令
mysql&gt; flush logs;
Query OK, 0 rows affected (0.00 sec)

mysql&gt; show master status\\G
*************************** 1. row ***************************
             File: 21_mysql_bin.000002
         Position: 154
     Binlog_Do_DB: 
 Binlog_Ignore_DB: 
Executed_Gtid_Set: 
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>解决思路中的02阶段</p></blockquote><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>[root@node21 ~]# cp -a /data/mysql/3306/logs/binlog/21_mysql_bin.000001 /tmp/
[root@node21 ~]# ll /tmp/21_mysql_bin.000001 
-rw-r----- 1 mysql mysql 2335 7月   1 08:06 /tmp/21_mysql_bin.000001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>解决思路中的03阶段 <img src="https://czxcab.cn/file/docs/binlog3.jpg" alt=""> 最终的结果：起始pos点3235；结束pos点3642</p></blockquote><blockquote><p>解决思路中的04阶段</p></blockquote><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>## 进入到之前备份binlog文件的目录
[root@node21 tmp]# pwd
/tmp
[root@node21 tmp]# ll 21_mysql_bin.000001 
-rw-r----- 1 mysql mysql 2017 3月   3 19:22 21_mysql_bin.000001

## 对binlog日志进行解释并保存到a.txt文件中
[root@node21 tmp]# mysqlbinlog --base64-output=decode-rows -vv \\
--start-position=3235 --stop-position=3642 21_mysql_bin.000001 &gt;a.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>解决思路中的05阶段</p></blockquote><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>############################## 处理 a.txt 文件,生成 b.txt 文件 #######################
[root@node21 tmp]# sed -n &#39;/^###/&#39;p a.txt  &gt;b.txt
[root@node21 tmp]# cat b.txt 
### DELETE FROM \`lili\`.\`test1\`
### WHERE
###   @1=10 /* INT meta=0 nullable=0 is_null=0 */
###   @2=&#39;cl10&#39; /* VARSTRING(60) meta=60 nullable=0 is_null=0 */
###   @3=1 /* ENUM(1 byte) meta=63233 nullable=0 is_null=0 */
###   @4=30 /* TINYINT meta=0 nullable=0 is_null=0 */
###   @5=180                  /* FLOAT meta=4 nullable=0 is_null=0 */
###   @6=65.5                 /* FLOAT meta=4 nullable=0 is_null=0 */
###   @7=&#39;四川信息10&#39; /* VARSTRING(90) meta=90 nullable=0 is_null=0 */
###   @8=&#39;专科&#39; /* VARSTRING(30) meta=30 nullable=0 is_null=0 */
###   @9=&#39;18382024230&#39; /* STRING(33) meta=65057 nullable=0 is_null=0 */
###   @10=&#39;158317100@qq.com&#39; /* VARSTRING(90) meta=90 nullable=0 is_null=0 */
###   @11=7000                 /* FLOAT meta=4 nullable=0 is_null=0 */


############################## 处理 b.txt 文件,生成 c.txt 文件 #######################
[root@node21 tmp]# sed &#39;s/### //g&#39; b.txt &gt;c.txt
[root@node21 tmp]# cat c.txt 
DELETE FROM \`lili\`.\`test1\`
WHERE
  @1=10 /* INT meta=0 nullable=0 is_null=0 */
  @2=&#39;cl10&#39; /* VARSTRING(60) meta=60 nullable=0 is_null=0 */
  @3=1 /* ENUM(1 byte) meta=63233 nullable=0 is_null=0 */
  @4=30 /* TINYINT meta=0 nullable=0 is_null=0 */
  @5=180                  /* FLOAT meta=4 nullable=0 is_null=0 */
  @6=65.5                 /* FLOAT meta=4 nullable=0 is_null=0 */
  @7=&#39;四川信息10&#39; /* VARSTRING(90) meta=90 nullable=0 is_null=0 */
  @8=&#39;专科&#39; /* VARSTRING(30) meta=30 nullable=0 is_null=0 */
  @9=&#39;18382024230&#39; /* STRING(33) meta=65057 nullable=0 is_null=0 */
  @10=&#39;158317100@qq.com&#39; /* VARSTRING(90) meta=90 nullable=0 is_null=0 */
  @11=7000                 /* FLOAT meta=4 nullable=0 is_null=0 */


############################## 处理 c.txt 文件,生成 d.txt 文件 #######################
[root@node21 tmp]# sed &#39;s#/.*#,#g&#39; c.txt &gt;d.txt
[root@node21 tmp]# cat d.txt 
DELETE FROM \`lili\`.\`test1\`
WHERE
  @1=10 ,
  @2=&#39;cl10&#39; ,
  @3=1 ,
  @4=30 ,
  @5=180                  ,
  @6=65.5                 ,
  @7=&#39;四川信息10&#39; ,
  @8=&#39;专科&#39; ,
  @9=&#39;18382024230&#39; ,
  @10=&#39;158317100@qq.com&#39; ,
  @11=7000                 ,


############################## 处理 d.txt 文件,生成 e.txt 文件 #######################
[root@node21 tmp]# sed &#39;s#DELETE FROM#INSERT INTO#g&#39; d.txt &gt;e.txt
[root@node21 tmp]# cat e.txt 
INSERT INTO \`lili\`.\`test1\`
WHERE
  @1=10 ,
  @2=&#39;cl10&#39; ,
  @3=1 ,
  @4=30 ,
  @5=180                  ,
  @6=65.5                 ,
  @7=&#39;四川信息10&#39; ,
  @8=&#39;专科&#39; ,
  @9=&#39;18382024230&#39; ,
  @10=&#39;158317100@qq.com&#39; ,
  @11=7000                 ,


############################## 处理 e.txt 文件,生成 f.txt 文件 #######################
[root@node21 tmp]# sed &#39;s#WHERE#SELECT#g&#39; e.txt &gt;f.txt
[root@node21 tmp]# cat f.txt 
INSERT INTO \`lili\`.\`test1\`
SELECT
  @1=10 ,
  @2=&#39;cl10&#39; ,
  @3=1 ,
  @4=30 ,
  @5=180                  ,
  @6=65.5                 ,
  @7=&#39;四川信息10&#39; ,
  @8=&#39;专科&#39; ,
  @9=&#39;18382024230&#39; ,
  @10=&#39;158317100@qq.com&#39; ,
  @11=7000                 ,


############################## 处理 f.txt 文件,生成 h.txt 文件 #######################
[root@node21 tmp]# sed -r &#39;s#(@11=.*)(,)#\\1;#g&#39; f.txt &gt;h.txt
[root@node21 tmp]# cat h.txt 
INSERT INTO \`lili\`.\`test1\`
SELECT
  @1=10 ,
  @2=&#39;cl10&#39; ,
  @3=1 ,
  @4=30 ,
  @5=180                  ,
  @6=65.5                 ,
  @7=&#39;四川信息10&#39; ,
  @8=&#39;专科&#39; ,
  @9=&#39;18382024230&#39; ,
  @10=&#39;158317100@qq.com&#39; ,
  @11=7000                 ;


############################## 处理 h.txt 文件,生成 aa.sql 文件 ######################
[root@node21 tmp]# sed -r &#39;s#(@.*=)(.*)#\\2#g&#39; h.txt &gt;&gt;aa.sql
[root@node21 tmp]# cat aa.sql 
INSERT INTO \`lili\`.\`test1\`
SELECT
  10 ,
  &#39;cl10&#39; ,
  1 ,
  30 ,
  180                  ,
  65.5                 ,
  &#39;四川信息10&#39; ,
  &#39;专科&#39; ,
  &#39;18382024230&#39; ,
  &#39;158317100@qq.com&#39; ,
  7000                 ;


############################## 在aa.sql文件后面添加commit;命令 ####################
[root@node21 tmp]# sed -i &#39;$a commit;&#39; aa.sql 
[root@node21 tmp]# cat aa.sql 
INSERT INTO \`lili\`.\`test1\`
SELECT
  10 ,
  &#39;cl10&#39; ,
  1 ,
  30 ,
  180                  ,
  65.5                 ,
  &#39;四川信息10&#39; ,
  &#39;专科&#39; ,
  &#39;18382024230&#39; ,
  &#39;158317100@qq.com&#39; ,
  7000                 ;
commit;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>解决思路中的06阶段</p></blockquote><div class="language-mysql line-numbers-mode" data-ext="mysql" data-title="mysql"><pre class="language-mysql"><code>#### 将aa.sql文件中的语句在数据库中进行执行
mysql&gt; INSERT INTO \`lili\`.\`test1\`
    -&gt; SELECT
    -&gt;   10 ,
    -&gt;   &#39;cl10&#39; ,
    -&gt;   1 ,
    -&gt;   30 ,
    -&gt;   180                  ,
    -&gt;   65.5                 ,
    -&gt;   &#39;四川信息10&#39; ,
    -&gt;   &#39;专科&#39; ,
    -&gt;   &#39;18382024230&#39; ,
    -&gt;   &#39;158317100@qq.com&#39; ,
    -&gt;   7000                 ;
Query OK, 1 row affected (0.00 sec)
Records: 1  Duplicates: 0  Warnings: 0

mysql&gt; commit;
Query OK, 0 rows affected (0.00 sec)


#### 查看数据是否成功恢复到test1表中
mysql&gt; select * from lili.test1 where id=10;
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
| id | name | sex | age | height | weight | gr_sc          | education | phone       | email            | salary  |
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
| 10 | cl10 | 男  |  30 | 180.00 |  65.50 | 四川信息10       | 专科      | 18382024230 | 158317100@qq.com | 7000.00 |
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h2><ol><li><p>每当重启mysql的时候，都会自动生成一个新的binlog文件，恢复数据的时候首先确定需要恢复的数据在哪个日志文件中，然后查找对应binlog文件进行数据恢复。</p></li><li><p>binlog分别记录了一个操作的起始位置<code>Pos</code>和结束位置<code>End_log_pos</code>，当起始位置和终止位置都选择正确的时候，恢复的数据才会正确，尤其是当进行连续的多行记录进行恢复的时候，对于<code>stop-position</code>的选择一定要注意，最后一行的<code>End_log_pos</code>才是我们需要的。</p></li></ol>`,57),a=[d];function t(c,v){return i(),e("div",null,a)}const u=n(s,[["render",t],["__file","mysqlbinlog的使用.html.vue"]]),r=JSON.parse('{"path":"/docs/knowledgeShard/mysqlbinlog%E7%9A%84%E4%BD%BF%E7%94%A8.html","title":"mysqlbinlog的使用","lang":"zh-CN","frontmatter":{"title":"mysqlbinlog的使用"},"headers":[{"level":2,"title":"什么是binlog？","slug":"什么是binlog","link":"#什么是binlog","children":[]},{"level":2,"title":"如何开启binlog？","slug":"如何开启binlog","link":"#如何开启binlog","children":[]},{"level":2,"title":"如何使用mysqlbinlog查询操作记录？","slug":"如何使用mysqlbinlog查询操作记录","link":"#如何使用mysqlbinlog查询操作记录","children":[{"level":3,"title":"1.读取所有数据库的操作","slug":"_1-读取所有数据库的操作","link":"#_1-读取所有数据库的操作","children":[]},{"level":3,"title":"2.查询指定数据库的操作","slug":"_2-查询指定数据库的操作","link":"#_2-查询指定数据库的操作","children":[]},{"level":3,"title":"3.查询指定位置的操作","slug":"_3-查询指定位置的操作","link":"#_3-查询指定位置的操作","children":[]},{"level":3,"title":"4.查询指定时间的操作","slug":"_4-查询指定时间的操作","link":"#_4-查询指定时间的操作","children":[]}]},{"level":2,"title":"如何恢复删除记录？","slug":"如何恢复删除记录","link":"#如何恢复删除记录","children":[{"level":3,"title":"1.直接使用mysqlbinlog进行查询带恢复","slug":"_1-直接使用mysqlbinlog进行查询带恢复","link":"#_1-直接使用mysqlbinlog进行查询带恢复","children":[]},{"level":3,"title":"2.先导出查询记录，然后通过mysql source操作进行数据恢复","slug":"_2-先导出查询记录-然后通过mysql-source操作进行数据恢复","link":"#_2-先导出查询记录-然后通过mysql-source操作进行数据恢复","children":[]}]},{"level":2,"title":"误删除数据恢复","slug":"误删除数据恢复","link":"#误删除数据恢复","children":[{"level":3,"title":"1.源数据模拟","slug":"_1-源数据模拟","link":"#_1-源数据模拟","children":[]},{"level":3,"title":"2.故障的模拟","slug":"_2-故障的模拟","link":"#_2-故障的模拟","children":[]},{"level":3,"title":"3.解决思路","slug":"_3-解决思路","link":"#_3-解决思路","children":[]},{"level":3,"title":"4.故障的处理","slug":"_4-故障的处理","link":"#_4-故障的处理","children":[]}]},{"level":2,"title":"注意事项","slug":"注意事项","link":"#注意事项","children":[]}],"git":{"updatedTime":1706749733000,"contributors":[{"name":"czx","email":"2504058202@qq.com","commits":4}]},"filePathRelative":"docs/knowledgeShard/mysqlbinlog的使用.md"}');export{u as comp,r as data};
