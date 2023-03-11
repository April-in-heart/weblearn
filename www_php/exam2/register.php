<meta charset="utf-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/12/24
 *Time: 18:28
 *
 */

require_once"./config.php";

if(isset($_POST['ok'])){
	$name=$_POST['name'];
	$password=$_POST['password'];
	//判断用户名是否存在
	$queryString="select name from user_70 where name='$name'";
	$rs=mysqli_query($link,$queryString);
	//判断用户是否找得到
	if(mysqli_num_rows($rs)>=1){
		//老用户，更新密码；
        //密码加密  md5加密方式密码一样加密串也一样
        $password=md5($password);
        $queryString="update user_70 set password='$password' where name='$name'";
        mysqli_query($link,$queryString);
	}
	else{
	    //没有name则新增
        //密码加密  md5加密方式密码一样加密串也一样
        $password=md5($password);
        echo $password."<br>";

        $queryString="insert into user_70(name,password)values('$name','$password')";
        mysqli_query($link,$queryString);
        echo mysqli_error($link);
        echo "注册成功";
	}
}
else{

}

?>
<form action="" method="post">
	<label for="name">姓名</label>
	<input type="text" id="name" name="name" value="" /><br>
	<label for="password">密码</label>
	<input type="password" id="password" name="password" value="" /><br>
	<input type="submit" id="ok" name="ok" value="ok" />
</form>
