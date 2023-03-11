<?php
// 给http包文给一个头
header('Content-Type:text/event-stream');
ob_end_clean();//清除缓冲区
ob_implicit_flush();
$name=$_GET['name'];
while(true){
	sleep(1);
	echo "data:".$name."|".microtime(true)."\n\n";//必须要这个格式，不然运行不了
}