<?php
/**
 *
 *User: Administrator
 *Date: 2020/12/18
 *Time: 10:37
 *
 */
//抓字符串中的链接地址

//正则表达式

$string="<a    href  =\"www.qq.com\">computer1</a><br><a href=\"www.baidu.com\">computer2</a><br>";
//file_get_contents可以读取本机地址和互联网地址
$string=file_get_contents("http://www.baidu.com");
//\s*允许有一个或多个空格
$pattern="/<a\s*href\s*=(.*?)>/i";

preg_match_all($pattern,$string,$urllist);

var_dump($urllist);