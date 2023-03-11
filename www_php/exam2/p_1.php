<meta charset="utf-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/12/24
 *Time: 17:42
 *
 */

//引入acl
require_once "acl_list.php";
$role=$_GET['role'];//得到网页传入的role
$resource="p_1.php";
isallow($acl,$role,$resource);//判断是否有权限访问