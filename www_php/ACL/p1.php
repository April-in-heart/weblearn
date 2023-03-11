<meta charset="utf-8">
<?php

//引入acl
require_once "acl.php";
$role=$_GET["role"];
$resource="p1.php";
isallow($acl,$role,$resource);

?>