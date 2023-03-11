<meta charset="utf-8">
<?php
/**
 * created by PhpStorm
 * user: JL
 * Date: 2020年10月16日
 * Time: 11:15:57
 * 服务器端程序设计第二个文件
 */
$name="mike";
$string_1="my name is $name";//my name is mike
$string_2="my name is ".$name;//my name is mike,这样出错概率少
$string_3="my name is"+$name;//0
$string_4='my name is $name';//my name is $name单引号所有东西原样输出，双引号对可能为变量的定义输出
echo $string_1;
echo "<br>";
echo $string_2;
echo "<br>";
echo $string_3;
echo "<br>";
echo $string_4."<br>";

//定义数组
$stu[0]="mike";
$stu[1]="rose";
$stu[2]="tom";

for ($i=0;$i<count($stu);$i++){
    //count指定stu数组有多少元素
    echo $stu[$i]."<br>";
}
echo "<br>";
$stu_1['one']['name']="mike";
$stu_1['one']['age']=18;
$stu_1['one']['major']="computer";
$stu_1['two']['name']="rose";
$stu_1['two']['age']=19;
$stu_1['two']['major']="math";
echo $stu_1['one']['major'];
echo "<br>";
//遍历二维数组用foreach
foreach ($stu_1 as $key=>$value){
//    echo $stu_1[$key]['name']."<br>";
    echo $stu_1[$key]['name']."|".$stu_1[$key]['age']."|".$stu_1[$key]['major']."<br>";
}
echo "<br>";
doIt("class is going on");//in doIt function
echo "<br>";
echo doIt("class is over now");//in doIt function in doIt return

//定义了形参必须要有参数或者设置默认值
function doIt($message=" no message "){
    echo "in doIt function".$message;
    echo "<br>";
    return "in doIt return".$message;
}
