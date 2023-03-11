<meta charset="utf-8">
<?php
// 程序文件名为blockchain_1.php
// 程序接受动态数据传入，格式为blockchain_1.php?data_1=创世&data_2=我爱&data_3=中华
// 程序中动态建立三个分布式存储文件bc_1.bc,bc_2.bc,bc_3.bc。
// 在b_1.bc存储"创世"及首节点信息摘要。
// 在b_2.bc存储"我爱"及链节点信息摘要。
// 在b_3.bc存储"中华"及链节点信息摘要。
// 最后输出末次信息摘要
// 链的数据结构为 |data_1|data_2|data_3:md5(|data_1|data_2|data_3)
$data_1=$_GET["data_1"];
$chain="";
$chain=$chain.'|'.$data_1;
$content=$chain.':'.md5($chain);
$file=file_put_contents("bc_1.bc",$content);

$data_2=$_GET["data_2"];
$chain=$chain.'|'.$data_2;
$content=$chain.':'.md5($chain);
$file=file_put_contents("bc_2.bc",$content);

$data_3=$_GET["data_3"];
$chain=$chain.'|'.$data_3;
$content=$chain.':'.md5($chain);
$file=file_put_contents("bc_3.bc",$content);
echo $content;
?>