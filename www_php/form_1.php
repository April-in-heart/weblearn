<meta charset="utf-8">
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

$name=$_POST["name"];
$age=$_POST["age"];
//验证name是否符合规范
//strpos：string position,输出匹配的字符串的位置,如果不存在该字符串则不输出
if(strpos($_POST["name"],"江")!==false){
    echo "姓名含有非法关键字";
}
//线程恢复:在html里嵌入服务器脚本(php)代码


?>

<form action="form_1.php" method="post">
    name:<input type="text" id="name" name="name" value="<?php echo $name?>"/><br>
    age:<input type="text" id="age" name="age" value="<?php echo $age?>"/><br>
    <input type="submit" id="ok" name="ok" value="ok"/><br>
</form>