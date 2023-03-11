<meta charset="UTF-8">
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
//可以读取本机地址和互联网地址
$string=file_get_contents("http://212.64.61.85:8022/goods/flash_sale.php");
//<span id="t420_i5">7897元</span>
//\s*允许有一个或多个空格,\表示转义字符
//$pattern="/<a\s*href\s*=(.*?)>/i";
//i （忽略大小写）
//g （全文查找出现的所有 pattern）
//gi （全文查找、忽略大小写）
$pattern="/<span id=\"t420_i5\">(.*?)元<\/span>/i";

preg_match_all($pattern,$string,$urllist);

var_dump($urllist);