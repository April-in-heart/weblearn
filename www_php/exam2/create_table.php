<meta charset="utf-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/12/24
 *Time: 18:33
 *
 */
require_once "./config.php";
mysqli_query($link,"DROP TABLE user_70");//仅用于实验，现实删除数据库很危险
$queryString="create table user_70(
    name char(50),
    address char(50),
    password char(50)
    )ENGINE=MyISAM DEFAULT CHARSET=utf8";
if (!mysqli_query($link,$queryString)){
    echo mysqli_error($link);
}
$queryString="insert into user_70(name,address,password)values('mike','shanghai','c4ca4238a0b923820dcc509a6f75849b')";
if (!mysqli_query($link,$queryString)){
    echo mysqli_error($link);
}
$queryString="insert into user_70(name,address,password)values('rose','beijing','c4ca4238a0b923820dcc509a6f75849b')";
if (!mysqli_query($link,$queryString)){
    echo mysqli_error($link);
}
