<meta charset="utf-8">
<!--将页面设置为utf-8格式-->
<?php
/**
 * created by PhpStorm
 * user: JL
 * Date: 2020年10月16日
 * Time: 09:40:31
 * 服务器端程序设计第一个文件
 */
//phpinfo();

echo "hello,world";//echo:在页面显示
//php与js都是弱类型语言
$name="mike";//定义变量前加$符号
$age=18;
$marriage=true;
echo "<br><font color='red' size='6'>".$name."</font>";//有杠说明以后会取消，有风险
echo "<br>".$age;
echo "<br>".$marriage;//变量之间用.连接

$name=100;//前面定义为字符串的name变成了数字不会报错
echo "<br>".$name;

$name="mike";
echo $name+$age;//10018
echo "<br>";
echo $name.$age;//mike18
echo "<br>";
$name="18mike";
echo $name+$age;//36
echo "<br>";
echo $name.$age;//18mike18
echo "<br>";
if($marriage){
    echo "已婚";
}else{
    echo "未婚";
}
echo "<br>";
if($name=="mike"){

}elseif ($name=="rose"){

}
for($i=0;$i<100;$i++){
    if($i%10==0)
        echo "<br>";
    echo $i."&nbsp";
}
echo "<br>";
echo "<br>";
echo $i;//只要定义了，在整个文档中都可以用，除非在方法内定义
while($i<100){
    echo $i;//不会输出任何东西
}
/*for ($j=10;$j<100;){
    echo $j;//死循环
}*/


//MVC

