<meta charset="UTF-8">
<?php

session_start();

require_once "./config/db_config.php";
if(isset($_POST["ok"])){
	$name=$_POST["name"];
	$password=$_POST["password"];
	$image_code=$_POST["image_code"];
	$password=md5($password);
	if($image_code!=$_SESSION["image_code"]){
		echo "验证码不正确";
	}else{
	//警告  可能会SQL注入
	$queryString="select * from user where user_name='$name' and password='$password'";
	//echo $queryString;
	$rs=mysqli_query($link,$queryString);
	//mysqli_num_rows返回记录数
	$number=mysqli_num_rows($rs);
	if($number==1){
		echo "登陆成功";
		echo "<a href='list_4.php'>进入后台</a>";
		//session
		$_SESSION["user"]="root";
		exit();
	}else{
		echo "登陆失败";
		echo "<a href='register.php'>用户注册</a>";
	}
	}
}else{
	
}

?>
<form action="" method="post">
	<label for="name">姓名</label>
	<input type="text" id="name" name="name" value="" /><br>
	<label for="password">密码</label>
	<input type="password" id="password" name="password" value="" /><br>
	<label for="image_code">验证码</label>
	<input type="text" id="image_code" name="image_code" value="" /><br>
	<img src="image_code.php"><br>
	<input type="submit" id="ok" name="ok" value="ok" />
</form>