<?php

//定义ACL(访问权限控制列表)
$acl=array(
	"ceo"=>array("p1.php","p2.php","p3.php"),
	"manager"=>array("p2.php","p3.php"),
	"staff"=>array("p3.php")
);

//定义判断
function isallow($acl,$role,$resource){
	if($role!="" && $resource!=""){
		if(in_array($resource,$acl[$role])){
			echo "欢迎访问该权限文件";
		}else{
			echo "无权访问";
		}
	}else{
		echo "无权访问";
	}
}


?>