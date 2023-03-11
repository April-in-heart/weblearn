<?php
/**
 *
 *User: Administrator
 *Date: 2020/12/18
 *Time: 13:26
 *
 */

$option=array(
    'uri'=>'http://localhost',
    'location'=>'http://localhost/server_1.php',
    'trace'=>'true'
);
$client=new SoapClient(null,$option);
echo $client->add(2,3);