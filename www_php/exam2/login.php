<meta charset="UTF-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/12/24
 *Time: 22:40
 *
 */

session_start();

require_once "./config.php";
if(isset($_POST["ok"])){
	$name=$_POST["name"];
	$password=$_POST["password"];
	$password=md5($password);
	//警告  可能会SQL注入
	$queryString="select * from user_70 where name='$name' and password='$password'";
	//echo $queryString;
	$rs=mysqli_query($link,$queryString);
	//mysqli_num_rows返回记录数
	$number=mysqli_num_rows($rs);
	if($number==1){
		echo "登陆成功";
		echo "<a href='user_info.php'>进入后台</a>";
		//session
		$_SESSION["s_name"]="$name";
		exit();
	}else{
		echo "登陆失败";
	}
}else{

}

?>
<form action="" method="post">
	<label for="name">姓名</label>
	<input type="text" id="name" name="name" value="" /><br>
	<label for="password">密码</label>
	<input type="password" id="password" name="password" value="" /><br>
	<input type="submit" id="ok" name="ok" value="ok" />
</form>