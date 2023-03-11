<meta charset="utf-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/10/23
 *Time: 9:25
 *
 */

$score=array(1,2,3,4,5,6);
echo $score[2];
echo "<br>";

$score=array(1,9,3,5,7,8,6,2,4);
sort($score);//内置正向排序,rsort反向排序

foreach ($score as $key=>$value){
    echo $key."=>".$value;
    echo "<br>";
}

$string="Hello world";
echo strlen($string);//输出字符个数
echo "<br>";

echo strpos($string,"or");//strpos：string position,输出匹配的字符串的位置
echo "<br>";
echo strpos($string,"ads");//如果不存在该字符串则不输出

//hell第一个字母下标为0，strpos里 0 代表false，用！==（绝对等于）则可以防下标为0的情况
if(strpos($string,"Hell")!==false)
    echo "找到该字符串";
else
    echo "未找到该字符串";
echo "<br>";





