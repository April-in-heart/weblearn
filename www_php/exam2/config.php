<meta charset="UTF-8">
<?php
/**
 *
 *User: Administrator
 *Date: 2020/12/24
 *Time: 18:29
 *
 */
//link前加下划线防止重名
$link=mysqli_connect("localhost","root","","student");
mysqli_query($link,"set names utf8");