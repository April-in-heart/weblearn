<meta charset="utf-8">
<?php

require_once"./config/db_config.php";

if(isset($_POST['ok'])){
	$name=$_POST['name'];
	$password1=$_POST['password1'];
	$password2=$_POST['password2'];
	//判断用户名是否存在
	$queryString="select user_name from user where user_name='$name'";
	$rs=mysqli_query($link,$queryString);
	//判断用户是否找得到
	if(mysqli_num_rows($rs)>=1){
		echo "此用户名已存在，请更换用户名";
	}
	else{
		//判断两次密码是否一致
		if($password1!=$password2){
			echo "两次密码不一致";
		}else{
			//没有id则新增
			//$id=uniqid($id);//unique+id：唯一的id,产生一个随机id
			$id=getMaxId($link);//自定义函数
			$date_insert=$date_update=time();//编辑时间跟新增时间一致
			//密码加密  md5加密方式密码一样加密串也一样
			$password1=md5($password1);
			echo $password1."<br>";
			
			$queryString="insert into user(id,user_name,password,date_insert,date_update)values('$id','$name','$password1','$date_insert','$date_update')";
			mysqli_query($link,$queryString);
			echo mysqli_error($link);
			echo "注册成功";
		}
	}
}
else{
	
}

?>
<form action="" method="post">
	<label for="name">姓名</label>
	<input type="text" id="name" name="name" value="" /><br>
	<label for="password">密码1</label>
	<input type="password" id="password1" name="password1" value="" /><br>
	<label for="password">密码2</label>
	<input type="password" id="password2" name="password2" value="" /><br>
	<input type="submit" id="ok" name="ok" value="ok" />
</form>
<?php
function getMaxId($link){
    $queryString="select id from user order by id desc limit 0,1";//desc降序排列，取一个，下标为0。
    $rs=mysqli_query($link,$queryString);
    $row=mysqli_fetch_assoc($rs);
    $maxId=$row["id"];//得到当前最大的id号，有风险，要锁表
    $maxId=intval($maxId)+1;//intval得到数值
    $length=strlen($maxId);//得到maxId长度
    $zeroNum=3-$length;//算出补零的个数
    $maxId=str_repeat('0',$zeroNum).$maxId;//str_repeat:把input重复后面指定次数
    return $maxId;
}
?>