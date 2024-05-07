---
title: LocalDateTime的使用
---



## 前言
> 前几天做的项目有个计算时间的需求，用到了LocalDateTime，记录一下。

我们平时最常用的就是`Date`类，但是 `Date` 的缺点：
- Date 如果不格式化，打印出的日期可读性差；
- 使用 SimpleDateFormat 可以对日期时间进行格式化，但是 SimpleDateFormat 并非线性安全；
- Date 对时间处理比较麻烦；

## 常用方法
`LocalDateTime`是`java.time`包下的类，它其实就是`LocalDate`和`LocalTime`的结合体，它提供了更多的时间操作方法。

我们直接上代码，创建一个测试类，用main方法测试

### 获取当前日期和时间
```java
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

public class MyTest {
    public static void main(String[] args) {
        LocalDate nowDate = LocalDate.now();
        System.out.println("结果：" + nowDate);
        LocalTime nowTime = LocalTime.now();
        System.out.println("结果：" + nowTime);
        LocalDateTime nowDateTime = LocalDateTime.now();
        System.out.println("结果：" + nowDateTime);
    }
}
```
输出结果如下：
![](https://czxcab.cn/file/docs/LocalDateTime1.jpg)

### 获取秒数和毫秒数
```java
// 获取秒数
Long second = LocalDateTime.now().toEpochSecond(ZoneOffset.of("+8"));
        
// 获取毫秒数
Long milliSecond = LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli();
```

### LocalDateTime与String互转
```java
// 时间转字符串格式化                                                                                                    
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");                                 
String dateTime1 = LocalDateTime.now(ZoneOffset.of("+8")).format(formatter);                                    
System.out.println("结果：" + dateTime1);                                                   
                                                                                                                
// 时间格式化2                                                                                                       
LocalDate localDate2 = LocalDate.of(2019, 9, 10);                                                               
String s1 = localDate2.format(DateTimeFormatter.BASIC_ISO_DATE);                                                
String s2 = localDate2.format(DateTimeFormatter.ISO_LOCAL_DATE);                                                
// 自定义格式化                                                                                                       
DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");                                              
String s3 = localDate2.format(dtf);                                                                             
// 时间格式化2：2019-09-10 20190910 2019-09-10 10/09/2019                                                             
System.out.println("时间格式化2：" + localDate2 + "  " + s1 + "  " + s2 + "  " + s3);                                 
                                                                                                                
// 字符串转时间                                                                                                       
String dateTimeStr = "2018-07-28 14:11:15";                                                                     
DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");                                      
LocalDateTime dateTime2 = LocalDateTime.parse(dateTimeStr, df);                                                 
System.out.println("结果：" + dateTime2);
```

### Date与LocalDateTime互转
```java
// 将java.util.Date 转换为java8 的java.time.LocalDateTime,默认时区为东8区                                                   
Date date = new Date();                                                                                         
LocalDateTime localDateTime = date.toInstant().atOffset(ZoneOffset.of("+8")).toLocalDateTime();                 
System.out.println("结果：" + localDateTime);                                       
                                                                                                                
// 将java8 的 java.time.LocalDateTime 转换为 java.util.Date，默认时区为东8区                                                 
Date date2 = Date.from(localDateTime.toInstant(ZoneOffset.of("+8")));                                           
System.out.println("结果：" + date2);
```

### LocalDateTime格式化
```java
LocalDateTime time = LocalDateTime.now();                                                                       
DateTimeFormatter dtf2 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");                                    
String strDate = dtf2.format(time);                                                                             
System.out.println("结果：" + strDate);
```

### LocalDate指定年月日，获取年、月、日、周次
```java
LocalDate someDate = LocalDate.of(2020, 4, 11);                                                                 
// 年                                                                                                            
int year = someDate.getYear();                                                                                  
int year1 = someDate.get(ChronoField.YEAR);                                                                     
// 月                                                                                                            
Month month = someDate.getMonth();                                                                              
int month1 = someDate.get(ChronoField.MONTH_OF_YEAR);                                                           
// 日                                                                                                            
int day = someDate.getDayOfMonth();                                                                             
int day1 = someDate.get(ChronoField.DAY_OF_MONTH);                                                              
// 周                                                                                                            
DayOfWeek dayOfWeek = someDate.getDayOfWeek();                                                                  
int dayOfWeek1 = someDate.get(ChronoField.DAY_OF_WEEK);                                                         
// 结果：日期：2020-04-11，年：2020==2020，月：APRIL==4                                                                     
// 日：11==11，周：SATURDAY==6                                                                                       
System.out.println("日期：" + someDate + "，年：" + year + "==" + year1 + "，月：" + month + "==" + month1);             
System.out.println("日：" + day + "==" + day1 + "，周：" + dayOfWeek + "==" + dayOfWeek1);
```

### LocalTime某个时间的时分秒
```java
LocalTime someTime = LocalTime.of(13, 51, 10);                                                                  
// 获取小时                                                                                                         
int hour = someTime.getHour();                                                                                  
int hour1 = someTime.get(ChronoField.HOUR_OF_DAY);                                                              
// 获取分                                                                                                          
int minute = someTime.getMinute();                                                                              
int minute1 = someTime.get(ChronoField.MINUTE_OF_HOUR);                                                         
// 获取秒                                                                                                          
int second1 = someTime.getSecond();                                                                             
int second2 = someTime.get(ChronoField.SECOND_OF_MINUTE);                                                       
// 时间：13:51:10，时：13==13，分：51==51                                                                                
// 秒：10==10                                                                                                     
System.out.println("时间：" + someTime + "，时：" + hour + "==" + hour1 + "，分：" + minute + "==" + minute1);           
System.out.println("秒：" + second1 + "==" + second2);
```

### 获取年月日和时分秒
```java
LocalDateTime ldt = LocalDateTime.of(2018, Month.SEPTEMBER, 10, 14, 46, 56);                                    
LocalDateTime ldt2 = LocalDateTime.of(someDate, someTime);                                                      
LocalDateTime ldt3 = someDate.atTime(someTime);                                                                 
LocalDateTime ldt4 = someTime.atDate(someDate);                                                                 
// --2019-09-10T14:46:56--2020-04-11T13:51:10--2020-04-11T13:51:10--2020-04-11T13:51:10                         
System.out.println("--" + ldt + "--" + ldt2 + "--" + ldt3 + "--" + ldt4);                                       
                                                                                                                
LocalDate ld2 = ldt.toLocalDate();                                                                              
LocalTime lt2 = ldt.toLocalTime();                                                                              
// --2019-09-10--14:46:56                                                                                       
System.out.println("--" + ld2 + "--" + lt2);
```

### 日期计算
```java
// 增加一年                                                                                                         
ldt2 = ldt.plusYears(1);                                                                                        
ldt3 = ldt.plus(1, ChronoUnit.YEARS);                                                                           
// 减少一个月                                                                                                        
ldt4 = ldt.minusMonths(1);                                                                                      
ldt = ldt.minus(1, ChronoUnit.MONTHS);                                                                          
                                                                                                                
System.out.println("日期计算--" + ldt2 + "--" + ldt3 + "--" + ldt4 + "--" + ldt);                                   
                                                                                                                
// 修改年为2019                                                                                                     
ldt2 = ldt.withYear(2020);                                                                                      
// 修改为2022                                                                                                      
ldt3 = ldt.with(ChronoField.YEAR, 2022);                                                                        
// 改年--2020-08-10T14:46:56--2022-08-10T14:46:56                                                                 
System.out.println("改年--" + ldt2 + "--" + ldt3);
```

### 日期计算
```java
// 比如有些时候想知道这个月的最后一天是几号、下个周末是几号，通过提供的时间和日期API可以很快得到答案 。                                                         
// TemporalAdjusters提供的各种日期时间格式化的静态类，比如firstDayOfYear是当前日期所属年的第一天                                               
LocalDate localDate = LocalDate.now();                                                                          
LocalDate localDate1 = localDate.with(TemporalAdjusters.firstDayOfYear());                                      
// 日期计算2：2020-04-11--2020-01-01                                                                                 
System.out.println("日期计算2：" + localDate + "--" + localDate1);
```
### Instant 获取秒数
```java
Instant instant = Instant.now();                                                                                
// 获取秒数                                                                                                         
long currentSecond = instant.getEpochSecond();                                                                  
// 获取毫秒数                                                                                                        
long currentTimeMillis = instant.toEpochMilli();                                                                
long currentTimeMillis2 = System.currentTimeMillis();                                                           
// Instant--2020-04-11T12:49:02.957Z--1586609342--1586609342957==1586609342957                                  
System.out.println( "Instant--" + instant + "--" + currentSecond + "--" + currentTimeMillis + "==" + currentTimeMillis2);
```

### 间隔计算
```java
// 使用Duration进行 day,hour,minute,second等的计算                                                                      
Duration duration = Duration.between(ldt, nowDateTime);                                                         
duration.toDays();                                                                                              
duration.toHours();                                                                                             
duration.toMinutes();                                                                                           
System.out.println("间隔天：" + duration.toDays() + "，间隔小时：" + duration.toHours() + "，间隔分钟：" + duration.toMinutes());


// 使用Period进行Year,Month的计算                                                                                      
Period period = Period.between(ldt.toLocalDate(), nowDateTime.toLocalDate());
period.getYears();
period.getMonths();
period.toTotalMonths();
System.out.println("间隔年：" + period.getYears() + "，间隔月：" + period.getMonths() + "，间隔总月：" + period.toTotalMonths());
```
