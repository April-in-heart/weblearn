<?php

// 接口程序文件名为interface_server_182.php
// 定义基于SOAP的WS接口。
// 接口URI地址为考生的虚拟机地址。
// 接口提供add方法，接受两个整形参数，返回两个参数的和。

function add($a,$b){
    return $a+$b;
}
//SOAP   TCP HTTP
$server=new SoapServer(
    null,
    array('uri'=>'192.168.56.1')
);
$server->addFunction("add");
$server->handle();//处理

