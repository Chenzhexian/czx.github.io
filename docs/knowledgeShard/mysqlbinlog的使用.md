---
title: mysqlbinlog的使用
---

## 什么是binlog？
binlog，也称为二进制日志，记录对数据发生或潜在发生更改的SQL语句，并以二进制的形式保存在磁盘中，可以用来查看数据库的变更历史（具体的时间点所有的SQL操作）、数据库增量备份和恢复（增量备份和基于时间点的恢复）、Mysql的复制（主主数据库的复制、主从数据库的复制）。

## 如何开启binlog？
首先我们可以进入mysql输入命令
```mysql
show variables like '%bin%'
```

我们可以通过这个命令来查询关于binlog相关的设置，其中有一个`log_bin`选项，如果为`off`，那么证明我们的binlog没有开启，如果为`on`证明我们的binlog已经开启

![](https://czxcab.cn/file/docs/binlog1.jpg)

开启binlog的方法很简单，只需要打开mysql的配置文件`my.ini`（也可能是`my.cnf`），找到log-bin，去掉前面的#号，如果没有该选项，则可以手动添加。
```mysql
[mysqld]
# 不指定路径
log-bin=mysql-bin
# 指定路径
log-bin=/yourpath/mysql-bin
# 这个值在不同的 MySQL 实例中必须是唯一的
server-id=1  
```

其中`mysql-bin`就是日志文件的名称了，日志文件的名称和路径都可以自定义，如果不配置路径和名称，默认的二进制日志路径通常是 MySQL 数据目录（也就是配置文件中`datadir`的目录），名称为`mysql-bin.xxxxxx`。



添加完成后重启mysql，我们就会对应目录下找到binlog日志文件了，首次使用binlog的时候会出现两个文件，一个是`mysql-bin.000001`，一个是`mysql-bin.index`，其中，000001结尾的文件就是我们需要的日志文件，它包含了我们数据库的所有增，改，删操作（查询操作不做记录），以index结尾的文件是索引文件，包含了所有的以000xxx结尾的日志文件。

常用的操作:
- 1.查找当前操作的binlog状态
    ```mysql
    show master status;
    ```

- 2.flush logs刷新状态
    ```mysql
    flush logs;
    ```
- 3.查找删除数据的起始位置、时间等关键信息
    ```mysql
    show binlog events in 'mysql-bin.000001';
    ```

## 如何使用mysqlbinlog查询操作记录？


```shell
mysqlbinlog --help
# 通过该命令我们可以了解到mysqlbinlog可以附带哪些参数
# 不同的参数对应什么状况。
```

### 1.读取所有数据库的操作

```shell
# 通过该命令，我们可以看到该日志文件中记录的所有数据库的增，该，删操作。
mysqlbinlog ../data/mysql-bin.000001
```

### 2.查询指定数据库的操作

```shell
# 通过该命令，我们可以查询数据库名称为test的增，该，删操作
mysqlbinlog --database=test ../data/mysql-bin.000001
```

### 3.查询指定位置的操作
binlog每次进行记录的时候都会为其标注一个position，用于标识该操作所在的位置，与之相关的参数为`--start-position`（开始位置）和`--stop-position`（结束位置），我们可以通过position进行指定操作的查询。

**如何获取position的值？**
![](https://czxcab.cn/file/docs/binlog2.jpg)

只需要在mysql中使用`show binlog events`即可，每一行都记录了一条操作，其中Pos就是该操作的start-position，`End_log_pos`就是stop-position。我们如果需要查询上述图片中的操作，可以使用以下语句：
```shell
mysqlbinlog --start-position=4 --stop-position=98 ../data/mysql-bin.000001 
```

### 4.查询指定时间的操作
除了有位置标识外，binlog还有时间标识，参数为`--start-datetime`（开始时间）和`--stop-datetime`（结束时间），如果想要查询某个时间段的操作，可以使用该参数。
```shell
mysqlbinlog --start-datetime="2015-08-08 10:00:00" --stop-datetime="2015-08-08 12:00:00" ../data/mysql-bin.000001 
```

常用的查询操作也就这么多了，查询操作不是我们的目的，恢复记录才是我们的目的，一切的查询都是为了恢复。

:::warning 注意
使用mysqlbinlog时终端无法正确显示这些二进制数据。在这种情况下，可以尝试使用--base64-output选项以Base64编码的形式输出：
```shell
# -vv:详细输出(包含sql语句)
mysqlbinlog --base64-output=DECODE-ROWS -vv binlog.000001 > output.txt
```
:::

## 如何恢复删除记录？
如果你对于查询操作了如指掌了，那么恢复操作就简单的多了，因为恢复数据就是在查询的基础上，恢复的方法大致分为两种：
### 1.直接使用mysqlbinlog进行查询带恢复
```shell
mysqlbinlog --start-position=4 --stop-position=98 mysql-bin.000001 | mysql -u root -p 
```

上述命令跟查询操作不同的地方在于尾部添加了`| mysql -u root -p`，该命令是用于连接数据库，整条命令连接起来就是恢复开始位置为4，结束位置为98的所有操作（不限于单行记录的恢复，如果想要用于连续的多行操作，只需要把最后的结束位置设置为最后一个需要进行恢复的行的`End_log_pos`即可）

###  2.先导出查询记录，然后通过mysql source操作进行数据恢复
```shell
mysqlbinlog --start-position=4 --stop-position=98 ../data/mysql-bin.000001 > test.sql

mysql>source test.sql 
```

## 误删除数据恢复
### 1.源数据模拟
```mysql
#### 创建lili库,并进入到lili库下面
create database if not exists lili character set utf8 collate utf8_general_ci;
use lili;


#### 创建test1表
create table if not exists test1(
  id int unsigned not null auto_increment comment"序列",
  name varchar(20) not null comment"姓名",
  sex enum("男","女") not null comment"性别",
  age tinyint unsigned not null comment"年龄",
  height float(5,2) not null comment"身高",
  weight float(5,2) not null comment"体重",
  gr_sc varchar(30) not null comment"毕业院校",
  education varchar(10) not null comment"学历",
  phone char(11) not null comment"电话号码",
  email varchar(30) not null comment"邮箱",
  salary float(9,2) unsigned not null comment"薪资",
  primary key(id)
)engine=innodb character set utf8 collate utf8_general_ci comment"测试表1";


#### 查看test1表的表结构
mysql> desc test1;
+-----------+---------------------+------+-----+---------+----------------+
| Field     | Type                | Null | Key | Default | Extra          |
+-----------+---------------------+------+-----+---------+----------------+
| id        | int(10) unsigned    | NO   | PRI | NULL    | auto_increment |
| name      | varchar(20)         | NO   |     | NULL    |                |
| sex       | enum('男','女')      | NO   |     | NULL    |                |
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
("cl01","男",21,171,65.5,"四川信息1","专科","18382024221","158317096@qq.com",6000),
("cl02","男",22,172,65.5,"四川信息2","专科","18382024222","158317096@qq.com",6200),
("cl03","男",23,173,65.5,"四川信息3","专科","18382024223","158317096@qq.com",6300),
("cl04","男",24,174,65.5,"四川信息4","专科","18382024224","158317096@qq.com",6400),
("cl05","男",25,175,65.5,"四川信息5","专科","18382024225","158317096@qq.com",6500),
("cl06","男",26,176,65.5,"四川信息6","专科","18382024226","158317096@qq.com",6600),
("cl07","男",27,177,65.5,"四川信息7","专科","18382024227","158317096@qq.com",6700),
("cl08","男",28,178,65.5,"四川信息8","专科","18382024228","158317096@qq.com",6800),
("cl09","男",29,179,65.5,"四川信息9","专科","18382024229","158317096@qq.com",6900),
("cl10","男",30,180,65.5,"四川信息10","专科","18382024230","158317100@qq.com",7000);
commit;


#### 查看test1表中的数据
mysql> select * from test1;
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
```
### 2.故障的模拟
```mysql
####  删除id等于10的记录
mysql> select * from test1 where id=10; 
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
| id | name | sex | age | height | weight | gr_sc          | education | phone       | email            | salary  |
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
| 10 | cl10 | 男  |  30 | 180.00 |  65.50 | 四川信息10       | 专科      | 18382024230 | 158317100@qq.com | 7000.00 |
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
1 row in set (0.00 sec)

mysql> delete from test1 where id=10;      # 删除test1表中id等于10的记录
Query OK, 1 row affected (0.00 sec)

mysql> select * from test1 where id=10;     # 查看test1表中id等于10的记录是否删除成功
Empty set (0.00 sec)


                  PS：业务还在产生数据


#### 往test1表中再插入数据
insert into test1(name,sex,age,height,weight,gr_sc,education,phone,email,salary) values
("chenliang01","男",21,171,65.5,"四川信息1","专科","18382024221","158317096@qq.com",6000);
commit;


#### 查看test1表中的数据
mysql> select * from test1;
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
```
### 3.解决思路
1. 在得知使用delete语句误删除了数据,这里是一条记录哈;需要做的事情：
   - A：使用`show master status`;命令查看看当前binlog是哪个文件,并记录下来;
   - B：执行`flush logs`命令重新生成新的binlog日志文件来记录sql语句产生的记录;
   - C：确定删除数据的命令是什么,这里是：`delete from test1 where id=10;`

2. 对“01阶段”中的“A步骤”中的binlog日志做备份(复制一份到其它目录下,防止损坏源binlog文件);
3. 在mysql中使用`show binlog events in `01阶段中A步骤记录的binlog文件名;命令找到`delete from test1 where id=10`；这条语句(事务)的起始pos点和结束pos点;
4. 用`mysqlbinlog`命令结合"03阶段"找到的起始pos点和结束pos点对"02步骤"复制的binlog文件
进行解释并生成新的文件;
5. 在“04阶段”中新生成的文件中进行处理,这里要结合到test1表的表结构来进行处理哈;
6. 恢复06阶段处理好的sql语句;

### 4.故障的处理
> 解决思路中的01阶段
```mysql
#### 查看当前binlog日志文件是哪个
mysql> show master status\G
*************************** 1. row ***************************
             File: 21_mysql_bin.000001
         Position: 4210
     Binlog_Do_DB: 
 Binlog_Ignore_DB: 
Executed_Gtid_Set: 
1 row in set (0.00 sec)


#### 使用flush logs命令重新生成新的binlog命令
mysql> flush logs;
Query OK, 0 rows affected (0.00 sec)

mysql> show master status\G
*************************** 1. row ***************************
             File: 21_mysql_bin.000002
         Position: 154
     Binlog_Do_DB: 
 Binlog_Ignore_DB: 
Executed_Gtid_Set: 
1 row in set (0.00 sec)
```
> 解决思路中的02阶段
```mysql
[root@node21 ~]# cp -a /data/mysql/3306/logs/binlog/21_mysql_bin.000001 /tmp/
[root@node21 ~]# ll /tmp/21_mysql_bin.000001 
-rw-r----- 1 mysql mysql 2335 7月   1 08:06 /tmp/21_mysql_bin.000001
```
> 解决思路中的03阶段
> ![](https://czxcab.cn/file/docs/binlog3.jpg)
> 最终的结果：起始pos点3235；结束pos点3642

> 解决思路中的04阶段
```mysql
## 进入到之前备份binlog文件的目录
[root@node21 tmp]# pwd
/tmp
[root@node21 tmp]# ll 21_mysql_bin.000001 
-rw-r----- 1 mysql mysql 2017 3月   3 19:22 21_mysql_bin.000001

## 对binlog日志进行解释并保存到a.txt文件中
[root@node21 tmp]# mysqlbinlog --base64-output=decode-rows -vv \
--start-position=3235 --stop-position=3642 21_mysql_bin.000001 >a.txt
```
> 解决思路中的05阶段
```mysql
############################## 处理 a.txt 文件,生成 b.txt 文件 #######################
[root@node21 tmp]# sed -n '/^###/'p a.txt  >b.txt
[root@node21 tmp]# cat b.txt 
### DELETE FROM `lili`.`test1`
### WHERE
###   @1=10 /* INT meta=0 nullable=0 is_null=0 */
###   @2='cl10' /* VARSTRING(60) meta=60 nullable=0 is_null=0 */
###   @3=1 /* ENUM(1 byte) meta=63233 nullable=0 is_null=0 */
###   @4=30 /* TINYINT meta=0 nullable=0 is_null=0 */
###   @5=180                  /* FLOAT meta=4 nullable=0 is_null=0 */
###   @6=65.5                 /* FLOAT meta=4 nullable=0 is_null=0 */
###   @7='四川信息10' /* VARSTRING(90) meta=90 nullable=0 is_null=0 */
###   @8='专科' /* VARSTRING(30) meta=30 nullable=0 is_null=0 */
###   @9='18382024230' /* STRING(33) meta=65057 nullable=0 is_null=0 */
###   @10='158317100@qq.com' /* VARSTRING(90) meta=90 nullable=0 is_null=0 */
###   @11=7000                 /* FLOAT meta=4 nullable=0 is_null=0 */


############################## 处理 b.txt 文件,生成 c.txt 文件 #######################
[root@node21 tmp]# sed 's/### //g' b.txt >c.txt
[root@node21 tmp]# cat c.txt 
DELETE FROM `lili`.`test1`
WHERE
  @1=10 /* INT meta=0 nullable=0 is_null=0 */
  @2='cl10' /* VARSTRING(60) meta=60 nullable=0 is_null=0 */
  @3=1 /* ENUM(1 byte) meta=63233 nullable=0 is_null=0 */
  @4=30 /* TINYINT meta=0 nullable=0 is_null=0 */
  @5=180                  /* FLOAT meta=4 nullable=0 is_null=0 */
  @6=65.5                 /* FLOAT meta=4 nullable=0 is_null=0 */
  @7='四川信息10' /* VARSTRING(90) meta=90 nullable=0 is_null=0 */
  @8='专科' /* VARSTRING(30) meta=30 nullable=0 is_null=0 */
  @9='18382024230' /* STRING(33) meta=65057 nullable=0 is_null=0 */
  @10='158317100@qq.com' /* VARSTRING(90) meta=90 nullable=0 is_null=0 */
  @11=7000                 /* FLOAT meta=4 nullable=0 is_null=0 */


############################## 处理 c.txt 文件,生成 d.txt 文件 #######################
[root@node21 tmp]# sed 's#/.*#,#g' c.txt >d.txt
[root@node21 tmp]# cat d.txt 
DELETE FROM `lili`.`test1`
WHERE
  @1=10 ,
  @2='cl10' ,
  @3=1 ,
  @4=30 ,
  @5=180                  ,
  @6=65.5                 ,
  @7='四川信息10' ,
  @8='专科' ,
  @9='18382024230' ,
  @10='158317100@qq.com' ,
  @11=7000                 ,


############################## 处理 d.txt 文件,生成 e.txt 文件 #######################
[root@node21 tmp]# sed 's#DELETE FROM#INSERT INTO#g' d.txt >e.txt
[root@node21 tmp]# cat e.txt 
INSERT INTO `lili`.`test1`
WHERE
  @1=10 ,
  @2='cl10' ,
  @3=1 ,
  @4=30 ,
  @5=180                  ,
  @6=65.5                 ,
  @7='四川信息10' ,
  @8='专科' ,
  @9='18382024230' ,
  @10='158317100@qq.com' ,
  @11=7000                 ,


############################## 处理 e.txt 文件,生成 f.txt 文件 #######################
[root@node21 tmp]# sed 's#WHERE#SELECT#g' e.txt >f.txt
[root@node21 tmp]# cat f.txt 
INSERT INTO `lili`.`test1`
SELECT
  @1=10 ,
  @2='cl10' ,
  @3=1 ,
  @4=30 ,
  @5=180                  ,
  @6=65.5                 ,
  @7='四川信息10' ,
  @8='专科' ,
  @9='18382024230' ,
  @10='158317100@qq.com' ,
  @11=7000                 ,


############################## 处理 f.txt 文件,生成 h.txt 文件 #######################
[root@node21 tmp]# sed -r 's#(@11=.*)(,)#\1;#g' f.txt >h.txt
[root@node21 tmp]# cat h.txt 
INSERT INTO `lili`.`test1`
SELECT
  @1=10 ,
  @2='cl10' ,
  @3=1 ,
  @4=30 ,
  @5=180                  ,
  @6=65.5                 ,
  @7='四川信息10' ,
  @8='专科' ,
  @9='18382024230' ,
  @10='158317100@qq.com' ,
  @11=7000                 ;


############################## 处理 h.txt 文件,生成 aa.sql 文件 ######################
[root@node21 tmp]# sed -r 's#(@.*=)(.*)#\2#g' h.txt >>aa.sql
[root@node21 tmp]# cat aa.sql 
INSERT INTO `lili`.`test1`
SELECT
  10 ,
  'cl10' ,
  1 ,
  30 ,
  180                  ,
  65.5                 ,
  '四川信息10' ,
  '专科' ,
  '18382024230' ,
  '158317100@qq.com' ,
  7000                 ;


############################## 在aa.sql文件后面添加commit;命令 ####################
[root@node21 tmp]# sed -i '$a commit;' aa.sql 
[root@node21 tmp]# cat aa.sql 
INSERT INTO `lili`.`test1`
SELECT
  10 ,
  'cl10' ,
  1 ,
  30 ,
  180                  ,
  65.5                 ,
  '四川信息10' ,
  '专科' ,
  '18382024230' ,
  '158317100@qq.com' ,
  7000                 ;
commit;
```
> 解决思路中的06阶段
```mysql
#### 将aa.sql文件中的语句在数据库中进行执行
mysql> INSERT INTO `lili`.`test1`
    -> SELECT
    ->   10 ,
    ->   'cl10' ,
    ->   1 ,
    ->   30 ,
    ->   180                  ,
    ->   65.5                 ,
    ->   '四川信息10' ,
    ->   '专科' ,
    ->   '18382024230' ,
    ->   '158317100@qq.com' ,
    ->   7000                 ;
Query OK, 1 row affected (0.00 sec)
Records: 1  Duplicates: 0  Warnings: 0

mysql> commit;
Query OK, 0 rows affected (0.00 sec)


#### 查看数据是否成功恢复到test1表中
mysql> select * from lili.test1 where id=10;
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
| id | name | sex | age | height | weight | gr_sc          | education | phone       | email            | salary  |
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
| 10 | cl10 | 男  |  30 | 180.00 |  65.50 | 四川信息10       | 专科      | 18382024230 | 158317100@qq.com | 7000.00 |
+----+------+-----+-----+--------+--------+----------------+-----------+-------------+------------------+---------+
1 row in set (0.00 sec)
```

## 注意事项
1. 每当重启mysql的时候，都会自动生成一个新的binlog文件，恢复数据的时候首先确定需要恢复的数据在哪个日志文件中，然后查找对应binlog文件进行数据恢复。

2. binlog分别记录了一个操作的起始位置`Pos`和结束位置`End_log_pos`，当起始位置和终止位置都选择正确的时候，恢复的数据才会正确，尤其是当进行连续的多行记录进行恢复的时候，对于`stop-position`的选择一定要注意，最后一行的`End_log_pos`才是我们需要的。
