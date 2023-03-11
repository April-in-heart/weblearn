<meta charset="UTF-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/12/4
 *Time: 9:39
 *
 */
if(isset($_POST["ok"])){
	$name=$_POST["name"];
	$age=$_POST["age"];
	$message="数据保存成功";
}else{
	$name="";
	$age="";
}
$message="";
?>
<!-- 文件名为form_test_1.php
表单包含姓名、年龄输入框与提交按钮
姓名输入框的id，name为name，年龄输入框的id，name为age
提交按钮的id，name,value都为ok
提交到本程序，提交后重现用户输入的信息 -->
<form action="" method="post">
    姓名:<input type="text" id="name" name="name" value="<?php echo $name?>"/><br>
    年龄:<input type="text" id="age" name="age" value="<?php echo $age?>"/><br>
    <input type="submit" id="ok" name="ok" value="ok"/><br>
</form>
<div id="div_1"><?php echo $message;?></div>