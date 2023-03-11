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
$role=$_GET['role'];
$resource="p_2.php";
isallow($acl,$role,$resource);