<?php
$name=$_POST["name"];
$age=$_POST["age"];
// 把数组转码，转成json格式
echo json_encode(
	array("name"=>$name,"age"=>$age)
);//服务器端最后要加分号，不然会报错