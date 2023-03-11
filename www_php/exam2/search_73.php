<meta charset="utf-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/12/25
 *Time: 13:09
 *
 */
require_once "./config.php";
if(isset($_POST["ok"])){
    $name=$_POST["search_name"];
    $queryString="select name from user_70 where name='$name'";
    $rs=mysqli_query($link,$queryString);
    //判断用户是否找得到
	if(mysqli_num_rows($rs)>=1){
	    //能查到数据，显示地址
        $queryString="select * from user_70 where name='$name'";
        $rs=mysqli_query($link,$queryString);
        $row=mysqli_fetch_assoc($rs);//row:行
        echo $row['address'];
    }else{
	    echo "查无此人";
    }
}
else{
    $name="";
}


?>

<form action="" method="post">
    <label for="search_name">姓名</label>
    <input type="text" id="search_name" name="search_name" value=""/><br>
    <input type="submit" id="ok" name="ok" value="ok"/><br>
</form>

