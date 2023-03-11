<?php
/**
 *
 *User: Administrator
 *Date: 2020/12/18
 *Time: 13:23
 *web server服务器端
 */
function add($a,$b){
    return $a+$b;
}
//SOAP   TCP HTTP
$server=new SoapServer(
    null,
    array('uri'=>'http://localhost/server_1.php')
);
$server->addFunction("add");
$server->handle();
