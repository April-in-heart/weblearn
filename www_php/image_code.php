<?php

//图形验证码
header("Content-type:image/png");
// $code="123456";
session_start();//开启session功能
$code=rand(1,10000);
$_SESSION["image_code"]=$code;//用了session其他页面也可以用这个值
$image=imagecreate(120,30);
$black=imagecolorallocate($image,0,0,0);
$white=imagecolorallocate($image,255,255,255);
$red=imagecolorallocate($image,255,0,0);
//从0这个位置开始填充颜色
imagefill($image,0,0,$black);
//把字符串写入图形验证码
imagestring($image,5,10,8,$code,$white);
//生成图片（png格式）
imagepng($image);
//回收空间
imagedestroy($image);

?>