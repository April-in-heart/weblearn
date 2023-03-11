<?php
/**
 *
 *User: Administrator
 *Date: 2020/12/24
 *Time: 18:01
 *
 */

//图形验证码
header("Content-type:image/png");
//$_GET获取网址传递的参数
$code=$_GET['img_code'];
$image=imagecreate(120,30);
$black=imagecolorallocate($image,0,0,0);
$white=imagecolorallocate($image,255,255,255);
//从0这个位置开始填充颜色
imagefill($image,0,0,$black);
//把字符串写入图形验证码,5,10,8分别是字体大小，x，y位置
imagestring($image,5,10,8,$code,$white);
//生成图片（png格式）
imagepng($image);
//回收空间
imagedestroy($image);
?>
