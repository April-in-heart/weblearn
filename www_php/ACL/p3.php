<meta charset="utf-8">
<?php

//引入acl
require_once "acl.php";
$role=$_GET["role"];
$resource="p3.php";
isallow($acl,$role,$resource);

?>