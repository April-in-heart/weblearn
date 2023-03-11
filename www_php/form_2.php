<meta charset="utf-8" xmlns="http://www.w3.org/1999/html">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/10/23
 *Time: 10:16
 *
 */

//接收客户端数据，注意POST要大写
//echo $_POST["name"]."<br>";
//echo $_POST["age"]."<br>";

if (isset($_POST["ok"])){
    //isset($_POST["ok"])判断是否提交表单
    //如果有，则提交了
    $name=$_POST["name"];
    $age=$_POST["age"];
}

$message="数据保存成功";

//验证name是否符合规范
//strpos：string position,输出匹配的字符串的位置,如果不存在该字符串则不输出
if(strpos($_POST["name"],"m")!==false){
    echo "姓名含有非法关键字";
}
else{
    $name="请输入姓名";
    $age=0;
}
//线程恢复:在html里嵌入服务器脚本(php)代码

//echo time();
//echo "<br>";
echo date("Y,m,d H-i-s");
$date=date("Y-m-d H:i:s",time());//hour,minute,second

?>

<form action="form_2.php" method="post">
    name:<input type="text" id="name" name="name" value="<?php echo $name?>"/><br>
    age:<input type="text" id="age" name="age" value="<?php echo $age?>"/><br>
    <input type="submit" id="ok" name="ok" value="ok"/><br>
</form>
<div id="div_1"><?php echo $message,"<br>",$date;?></div>